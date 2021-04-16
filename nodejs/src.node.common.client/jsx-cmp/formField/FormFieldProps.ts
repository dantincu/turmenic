import { ChangeEvent } from "react";
import { InputProps } from "reactstrap";

import { InputType } from "../../dom-types/InputType";

export interface FormFieldValidation {
  isError: boolean;
  validationErrMsg: string;
  preventDefault?: boolean | null | undefined;
}

export interface ValidationRule {
  errMsg: string;
}

export interface MinLengthValidationRule extends ValidationRule {
  minLength: number;
}

export interface MaxLengthValidationRule extends ValidationRule {
  maxLength: number;
}

export interface ExactLengthValidationRule extends ValidationRule {
  exactLength: number;
}

export interface RegexpValidationRule extends ValidationRule {
  validRegexp: RegExp;
}

export interface FieldValidationRules {
  validate?: (
    prevValue: any | null,
    newValue: any | null
  ) => FormFieldValidation;
  initialValidation?: FormFieldValidation;
  isRequired?: boolean | ValidationRule | null | undefined;
  minLength?: number | MinLengthValidationRule | null | undefined;
  maxLength?: number | MaxLengthValidationRule | null | undefined;
  exactLength?: number | ExactLengthValidationRule | null | undefined;
  regexpValidation?: RegExp | RegexpValidationRule | null | undefined;
}

export interface FormFieldClassNames {
  formGroupDomEl?: string | null | undefined;
  inputDomEl?: string | null | undefined;
  inputDomElError?: string | null | undefined;
  labelDomEl?: string | null | undefined;
  validationErrDomEl?: string | null | undefined;
}

export interface FormFieldProps {
  btstrpInputType: InputType;
  btstrpElProps?: InputProps | null | undefined;
  fieldValue?: string | ReadonlyArray<string> | number | null | undefined;
  fieldName?: string | null | undefined;
  fieldNameHint?: string | null | undefined;
  domElclassNames?: FormFieldClassNames | null | undefined;
  onChange?: (
    e: ChangeEvent,
    newValue: string | ReadonlyArray<string> | number | null
  ) => void;
  validationRules?: FieldValidationRules | null | undefined;
  disabled?: boolean | null | undefined;
}
