import React, { useState, FormEvent, ChangeEvent, FunctionComponent, ReactHTMLElement } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { FormFieldProps, FormFieldValidation, FieldValidationRules, FormFieldClassNames, MaxLengthValidationRule, MinLengthValidationRule, RegexpValidationRule, ValidationRule, ExactLengthValidationRule } from './FormFieldProps';
import { getChangeEventValue } from '../../dom-events/dom-events';

import { trmrkCssClasses, getCssClass } from '../../dom.css-classes';
import { getStrVal, reqValIsValid } from './FormFieldData';

const FormField = (props: FormFieldProps) => {
    const [fieldValue, setFieldValue] = useState(props.fieldValue);
    const [fieldValidation, setFieldValidation] = useState(props.validationRules?.initialValidation ?? null);

    const normalizeValidationRules = (vrl: FieldValidationRules) => {
        if (vrl.isRequired && typeof vrl.isRequired === "boolean") {
            vrl.isRequired = {
                errMsg: `${props.fieldName} is required`
            }
        }

        if (vrl.minLength && typeof vrl.minLength === "number") {
            vrl.minLength = {
                minLength: vrl.minLength,
                errMsg: `${props.fieldName} must contain a minimum of ${vrl.minLength} characters`
            }
        }

        if (vrl.maxLength && typeof vrl.maxLength === "number") {
            vrl.maxLength = {
                maxLength: vrl.maxLength,
                errMsg: `${props.fieldName} must not be longer than ${vrl.maxLength} characters`
            }
        }

        if (vrl.exactLength && typeof vrl.exactLength === "number") {
            vrl.exactLength = {
                exactLength: vrl.exactLength,
                errMsg: `${props.fieldName} must contain exactly ${vrl.exactLength} characters`
            }
        }

        if (vrl.regexpValidation && typeof vrl.regexpValidation === "object" && !(vrl.regexpValidation as RegexpValidationRule).validRegexp) {
            vrl.regexpValidation = {
                validRegexp: vrl.regexpValidation as RegExp,
                errMsg: `${props.fieldName} does not have the required format`
            }
        }

        return vrl;
    }

    const vldtnRules = props.validationRules ? normalizeValidationRules(props.validationRules) : null;

    const validate = (e: ChangeEvent) => {
        let validationResult: FormFieldValidation | null = null;

        if (vldtnRules) {
            const newValue = getChangeEventValue(e);

            if (vldtnRules.validate) {
                validationResult = vldtnRules.validate(fieldValue, newValue);
            } else {
                const newValueAsStr = getStrVal(newValue);

                validationResult = validateWithAllRules([
                    {
                        validator: (newValue, newValueAsStr) => !!vldtnRules.isRequired && reqValIsValid(newValue) !== true,
                        errMsg: (vldtnRules.isRequired as ValidationRule)?.errMsg
                    },
                    {
                        validator: (newValue, newValueAsStr) => !!vldtnRules.minLength && (newValueAsStr === null || newValueAsStr.length < (vldtnRules.minLength as MinLengthValidationRule).minLength),
                        errMsg: (vldtnRules.minLength as MinLengthValidationRule)?.errMsg
                    },
                    {
                        validator: (newValue, newValueAsStr) => !!vldtnRules.maxLength && (newValueAsStr !== null && newValueAsStr.length > (vldtnRules.maxLength as MaxLengthValidationRule).maxLength),
                        errMsg: (vldtnRules.maxLength as MaxLengthValidationRule)?.errMsg
                    },
                    {
                        validator: (newValue, newValueAsStr) => !!vldtnRules.exactLength && (newValueAsStr === null || newValueAsStr.length !== (vldtnRules.exactLength as ExactLengthValidationRule).exactLength),
                        errMsg: (vldtnRules.exactLength as ExactLengthValidationRule)?.errMsg
                    },
                    {
                        validator: (newValue, newValueAsStr) => !!vldtnRules.regexpValidation && !(newValueAsStr ?? "").match(((vldtnRules.regexpValidation) as RegexpValidationRule).validRegexp),
                        errMsg: (vldtnRules.regexpValidation as RegexpValidationRule)?.errMsg
                    }
                ], newValue, newValueAsStr);
            }
        }

        return validationResult;
    }

    const validateWithRule = (isError: (newValue: string | ReadonlyArray<string> | number | null, newValueAsStr: string | null) => boolean, errMsg: string, newValue: string | ReadonlyArray<string> | number | null, newValueAsStr: string | null): FormFieldValidation | null => {
        let validationResult = isError(newValue, newValueAsStr) ? {
            isError: true,
            validationErrMsg: errMsg
        } : null;

        return validationResult;
    }

    const validateWithAllRules = (rules: { validator: (newValue: string | ReadonlyArray<string> | number | null, newValueAsStr: string | null) => boolean, errMsg: string }[], newValue: string | ReadonlyArray<string> | number | null, newValueAsStr: string | null) => {
        let validationResult: FormFieldValidation | null = null;

        rules.forEach(val => {
            validationResult = validationResult ?? validateWithRule(val.validator, val.errMsg, newValue, newValueAsStr);
        });

        return validationResult;
    }

    const onChange = (e: ChangeEvent) => {
        const value = getChangeEventValue(e);
        const validationResult = validate(e);

        setFieldValidation(validationResult);

        if (validationResult?.preventDefault) {
            e.preventDefault();
        } else {
            setFieldValue(value);

            if (props.onChange) {
                props.onChange(e, value);
            }
        }        
    }

    const cssClasses = {
        formGroup: getCssClass([trmrkCssClasses.bootstrap.formGroup, props.domElclassNames?.formGroupDomEl]),
        fieldLabel: getCssClass([trmrkCssClasses.bootstrap.label, props.domElclassNames?.labelDomEl]),
        fieldInput: getCssClass([trmrkCssClasses.bootstrap.input, props.domElclassNames?.inputDomEl]),
        fieldError: getCssClass([trmrkCssClasses.validation.inputDomElError, props.domElclassNames?.inputDomElError]),
        validationError: getCssClass([trmrkCssClasses.validation.errorDomEl, props.domElclassNames?.validationErrDomEl])
    }

    const getFieldInputCssClass = () => {
        const fieldInputCssClass = fieldValidation?.isError ? getCssClass([cssClasses.fieldInput, cssClasses.fieldError]) : cssClasses.fieldInput;
        return fieldInputCssClass;
    }

    const getValidationDomEl = () => {
        const validationDomEl: JSX.Element | null = fieldValidation?.isError ? (<label className={cssClasses.validationError}>{ fieldValidation?.validationErrMsg }</label>) : null;
        return validationDomEl;
    }

    return (<FormGroup className={cssClasses.formGroup}>
        <Label title={props.fieldNameHint ?? ""} className={cssClasses.fieldLabel}>{ props.fieldName }</Label>
        <Input
            {...props.btstrpElProps}
            type={props.btstrpInputType}
            value={fieldValue ?? props.btstrpElProps?.value ?? ""}
            onChange={onChange}
            className={getFieldInputCssClass()}
            disabled={props.disabled ?? props.btstrpElProps?.disabled ?? false}></Input>
        { getValidationDomEl() }
    </FormGroup>);
}

export default FormField;