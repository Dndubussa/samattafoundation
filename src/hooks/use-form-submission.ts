import { useCallback, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";

interface UseFormSubmissionOptions {
  onSubmit: () => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  reset?: () => void;
}

/**
 * Standardizes async form submission state across contact, donation, and application forms.
 */
export function useFormSubmission({
  onSubmit,
  onSuccess,
  onError,
  reset,
}: UseFormSubmissionOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setIsSubmitting(true);

      try {
        await onSubmit();
        onSuccess?.();
        reset?.();
      } catch (error) {
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, onSuccess, onError, reset],
  );

  return { isSubmitting, handleSubmit };
}

/** Controlled text input/textarea change handler for plain object form state. */
export function createFieldChangeHandler<T extends Record<string, unknown>>(
  setFormData: Dispatch<SetStateAction<T>>,
) {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
}

/** Controlled select change handler for plain object form state. */
export function createSelectChangeHandler<T extends Record<string, unknown>>(
  setFormData: Dispatch<SetStateAction<T>>,
) {
  return (name: keyof T & string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
}
