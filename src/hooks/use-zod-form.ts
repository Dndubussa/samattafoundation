import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

export function useZodForm<TSchema extends z.ZodType<FieldValues>>(
  schema: TSchema,
  defaultValues: DefaultValues<z.infer<TSchema>>,
) {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });
}
