import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Loader from "react-loader-spinner";

import { AddAppDriveModalProps, AppDriveFields } from './AddAppDriveModalProps';
import { DeviceRootDirLocation } from "../../src.node.common/app-data/schema/device-dir-locations.schema";
import { ApiResponse } from '../../api/api.types';

import FormField from '../../src.node.common.client/jsx-cmp/formField/FormField';
import { FormFieldProps, FieldValidationRules } from '../../src.node.common.client/jsx-cmp/formField/FormFieldProps';

import { FormFieldData, getStrVal, reqValIsValid } from '../../src.node.common.client/jsx-cmp/formField/FormFieldData';
import { trmrkCssClasses } from '../../src.node.common.client/dom.css-classes';

const AddAppDriveModal = (props: AddAppDriveModalProps) => {
    const [formDisabled, setFormDisabled] = useState(false);
    const [apiWaiter, setApiWaiter] = useState(false);

    const [formFields, setFormFields] = useState<AppDriveFields>(props.initialData ?? {
        displayName: "",
        description: "",
        path: ""
    });

    const formFieldsData = {
        displayName: {
            btstrpInputType: "text",
            disabled: formDisabled,
            fieldName: "Give your app drive a short title",
            fieldValue: formFields.displayName,
            validationRules: {
                isRequired: true
            },
            onChange: (e, newVal) => {
                setFormFields({...formFields, displayName: newVal as string});
                setFormErrMsg(null);
            },
        } as FormFieldData,
        description: {
            btstrpInputType: "text",
            disabled: formDisabled,
            fieldName: "Type something that will help you remember what this app drive contains and/or what you'll be using it for",
            fieldValue: formFields.description,
            onChange: (e, newVal) => {
                setFormFields({...formFields, description: newVal as string});
                setFormErrMsg(null);
            },
        } as FormFieldData,
        path: {
            btstrpInputType: "text",
            disabled: formDisabled,
            fieldName: "Click the browse button bellow or paste the file path this drive will be mapped to",
            fieldValue: formFields.path,
            validationRules: {
                isRequired: true
            },
            onChange: (e, newVal) => {
                setFormFields({...formFields, path: newVal as string});
                setFormErrMsg(null);
            },
        } as FormFieldData,
    }

    const browseFolder = () => {
    }

    const [formErrMsg, setFormErrMsg] = useState<string | null>(null);

    const validateForm = (): boolean => {
        let formValid = reqValIsValid(formFields.displayName) && reqValIsValid(formFields.path);

        if (formValid !== true) {
            setFormErrMsg("The form contains invalid data. Please review the data you provided and try again.");
        }

        return formValid;
    }

    const getApiCallErrMsg = (apiResponse: ApiResponse<any, any>) => {
        let errMsg = "An error ocurred";

        if (apiResponse.response && (apiResponse.response.status || apiResponse.response.statusText)) {
            errMsg = `${errMsg}: ${apiResponse.response.status} - ${apiResponse.response.statusText}`;
        }

        return errMsg;
    }

    const onFormSubmitted = () => {
        setFormDisabled(true);
        setApiWaiter(true);
    }

    const onFormResumed = () => {
        setFormDisabled(false);
        setApiWaiter(false);
    }

    const submit = async () => {
        onFormSubmitted();
        if (validateForm() === true) {
            const apiResponse = await props.onSubmit({
                name: formFields.displayName,
                description: formFields.description,
                absPath: formFields.path,
            } as DeviceRootDirLocation);
            if ((apiResponse.response?.status ?? 400) < 300) {
                onFormResumed();
                props.toggle();
            } else {
                const errMsg = getApiCallErrMsg(apiResponse);
                setFormErrMsg(errMsg);
                onFormResumed();
            }
        } else {
            onFormResumed();
        }
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    const getFormErrMsgDomEl = () => {
        return (typeof formErrMsg === "string" && formErrMsg.length > 0) ? (<label className={trmrkCssClasses.validation.errorDomEl}>{formErrMsg}</label>) : null;
    }

    const getWaiter = (apiWaiter: boolean) => {
        const waiter = apiWaiter ? (<Loader type="Puff"></Loader>) : null;
    }

    return (<Modal className={trmrkCssClasses.bootstrap.modal} isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Add app drive</ModalHeader>
        <ModalBody>
            <Form onSubmit={onSubmit} disabled={formDisabled}>
                <FormField {...formFieldsData.displayName}></FormField>
                <FormField {...formFieldsData.description}></FormField>
                <FormField {...formFieldsData.path}></FormField>
                <Button color="primary" onClick={browseFolder} disabled={formDisabled}>Browse</Button>{' '}
                <br /><br />
                { getFormErrMsgDomEl() }
                { getWaiter(apiWaiter) }
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submit} disabled={formDisabled}>Save</Button>{' '}
          <Button color="secondary" onClick={props.toggle} disabled={formDisabled}>Cancel</Button>
        </ModalFooter>
    </Modal>);
}

export default AddAppDriveModal;