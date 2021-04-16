import { ChangeEvent } from "react";

import { InputType } from "../../dom-types/InputType";
import { FieldValidationRules } from "./FormFieldProps";

export interface FormFieldData {
  btstrpInputType: InputType;
  fieldValue: string | number | readonly string[];
  fieldName: string;
  disabled: boolean;
  validationRules?: FieldValidationRules | null | undefined;
  onChange?: (
    e: ChangeEvent,
    newValue: string | ReadonlyArray<string> | number | null
  ) => {};
}

export const reqValIsValid = (
  value: string | number | readonly string[] | null
) => {
  const isValid =
    typeof value !== "undefined" &&
    value !== null &&
    (typeof value !== "number" || isNaN(value) === false) &&
    (typeof value !== "string" || value !== "");
  return isValid;
};

export const getStrVal = (
  value: string | number | readonly string[] | null
) => {
  let strVal: string | null = value?.toString() ?? null;

  if (
    typeof value === "undefined" ||
    value === null ||
    (typeof value === "number" && isNaN(value))
  ) {
    strVal = null;
  } else if (
    typeof value === "object" &&
    typeof value.length === "number" &&
    value.length >= 0
  ) {
    strVal = value.join("");
  }

  return strVal;
};
