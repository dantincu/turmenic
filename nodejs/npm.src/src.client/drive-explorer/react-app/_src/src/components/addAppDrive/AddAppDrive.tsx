import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Loader from "react-loader-spinner";

import { AddAppDriveProps } from './AddAppDriveProps';
import { DeviceRootDirLocation } from "../../src.node.common/app-data/schema/device-dir-locations.schema";
import { ApiResponse } from '../../api/api.types';

const AddAppDrive = (props: AddAppDriveProps) => {
    const [formDisabled, setFormDisabled] = useState(false);
    const [apiWaiter, setApiWaiter] = useState(false);

    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [path, setPath] = useState("");

    const [displayNameErrMsg, setDisplayNameErrMsg] = useState<string | null>(null);
    const [pathErrMsg, setPathErrMsg] = useState<string | null>(null);

    const [apiCallErrMsg, setApiCallErrMsg] = useState<string | null>(null);

    const getClassName = (errMsg: string | null) => {
        const cssClassName = errMsg === null ? "" : "error";
        return cssClassName;
    }

    const getErrMsgHtmlElement = (errMsg: string | null) => {
        const htmlElement = errMsg === null ? null : (<label className="error">{errMsg}</label>)
        return htmlElement;
    }

    const validateForm = (): boolean => {
        let fieldValid = false;
        let formValid = true;

        fieldValid = validateDisplayName(displayName);
        formValid = formValid && fieldValid;

        fieldValid = validatePath(path);
        formValid = formValid && fieldValid;

        return formValid;
    }

    const getApiCallErrMsg = (apiResponse: ApiResponse<any, any>) => {
        let errMsg = "An error ocurred";

        if (apiResponse.response && (apiResponse.response.status || apiResponse.response.statusText)) {
            errMsg = `${errMsg}: ${apiResponse.response.status} - ${apiResponse.response.statusText}`;
        }

        return errMsg;
    }

    const onApiCall = () => {
        setFormDisabled(true);
        setApiWaiter(true);
    }

    const onApiResponse = () => {
        setFormDisabled(false);
        setApiWaiter(false);
    }

    const submit = async () => {
        onApiCall();
        if (validateForm() === true) {
            const apiResponse = await props.onSubmit({
                name: displayName,
                description: description,
                absPath: path,
            } as DeviceRootDirLocation);
            if ((apiResponse.response?.status ?? 400) < 300) {
                onApiResponse();
                props.toggle();
            } else {
                const errMsg = getApiCallErrMsg(apiResponse);
                setApiCallErrMsg(errMsg);
                onApiResponse();
            }
        } else {
            onApiResponse();
        }
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    const getChangeEventValue = (e: ChangeEvent) => {
        const value: string = (e.target as any).value ?? "";
        return value;
    }

    const displayNameChanged = (e: ChangeEvent) => {
        const value = getChangeEventValue(e);
        setDisplayName(value);

        validateDisplayName(value);
    }

    const validateDisplayName = (value: string) => {
        let fieldValid = true;

        if (value.length === 0) {
            fieldValid = false;
            setDisplayNameErrMsg("The display name is required");
        } else {
            setDisplayNameErrMsg(null);
        }

        return fieldValid;
    }

    const descriptionChanged = (e: ChangeEvent) => {
        const value = getChangeEventValue(e);
        setDescription(value);
    }

    const pathChanged = (e: ChangeEvent) => {
        const value = getChangeEventValue(e);
        setPath(value);
        if (validatePath(value) && displayName.length === 0) {
            setDisplayName(value);
            validateDisplayName(value);
        }
    }

    const validatePath = (value: string) => {
        let fieldValid = true;

        if (value.length === 0) {
            fieldValid = false;
            setPathErrMsg("The display name is required");
        } else {
            setPathErrMsg(null);
        }

        return fieldValid;
    }

    const getWaiter = (apiWaiter: boolean) => {
        const waiter = apiWaiter ? (<Loader type="Puff"></Loader>) : null;
    }
  
    return (<Modal className="trmrk-app-modal" isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Add app drive</ModalHeader>
        <ModalBody>
            <Form onSubmit={onSubmit} disabled={formDisabled}>
                <FormGroup>
                    <Label title="Give your app drive a short title">Display name</Label>
                    <Input type="text" value={displayName} onChange={displayNameChanged} className={getClassName(displayNameErrMsg)}></Input>
                    { getErrMsgHtmlElement(displayNameErrMsg) }
                </FormGroup>
                <FormGroup>
                    <Label title="Type something that will help you remember what this app drive contains and/or what you'll be using it for">Description</Label>
                    <Input type="text" value={displayName} onChange={descriptionChanged} className={getClassName(displayNameErrMsg)}></Input>
                </FormGroup>
                <FormGroup>
                    <Label title="Click the browse button bellow or paste the file path this drive will be mapped to">Path</Label>
                    <Input type="text" value={path} onChange={pathChanged} className={getClassName(pathErrMsg)}></Input>
                    { getErrMsgHtmlElement(pathErrMsg) }
                </FormGroup>
                { getErrMsgHtmlElement(apiCallErrMsg) }
                { getWaiter(apiWaiter) }
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submit} disabled={formDisabled}>Save</Button>{' '}
          <Button color="secondary" onClick={props.toggle} disabled={formDisabled}>Cancel</Button>
        </ModalFooter>
      </Modal>);
}

export default AddAppDrive;