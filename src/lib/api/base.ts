import type { PostgrestError } from "@supabase/supabase-js";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly code?: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function assertNoError(error: PostgrestError | null): void {
  if (error) {
    throw new ApiError(error.message, error.code, error);
  }
}

export function assertData<T>(data: T | null, message = "No data returned"): T {
  if (data === null) {
    throw new ApiError(message);
  }
  return data;
}

/** Maps Postgres unique-violation to a user-facing message when provided. */
export function handleUniqueViolation(
  error: PostgrestError,
  duplicateMessage: string,
): never {
  if (error.code === "23505") {
    throw new ApiError(duplicateMessage, error.code, error);
  }
  throw new ApiError(error.message, error.code, error);
}
