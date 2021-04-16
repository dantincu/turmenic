import { ChangeEvent } from "react";

export const getChangeEventValue = (e: ChangeEvent) => {
  const value: string | ReadonlyArray<string> | number | null =
    (e.target as any).value ?? null;

  return value;
};
