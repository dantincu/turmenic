import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { AddAppDriveProps } from './AddAppDriveProps';
import { NewAppDrive } from '../../api/api.types';

const AddAppDrive = (props: AddAppDriveProps) => {
    const [displayName, setDisplayName] = useState("");
    const [path, setPath] = useState("");

    const [displayNameErrMsg, setDisplayNameErrMsg] = useState<string | null>(null);
    const [pathErrMsg, setPathErrMsg] = useState<string | null>(null);

    const getClassName = (errMsg: string | null) => {
        const cssClassName = errMsg === null ? "" : "error";
        return cssClassName;
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

    const submit = () => {
        if (validateForm() === true) {
            props.onSubmit({
                displayName: displayName,
                path: path
            });
            props.toggle();
        } else {
            console.log("form invalid")
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
  
    return (<Modal className="trmr-app-modal" isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Add app drive</ModalHeader>
        <ModalBody>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label title="This will be displayed in the app drives explorer page in front of this drive">Display name</Label>
                    <Input type="text" value={displayName} onChange={displayNameChanged} className={getClassName(displayNameErrMsg)}></Input>
                    { (displayNameErrMsg?.length ?? 0) === 0 ? null : <label className="error">{displayNameErrMsg}</label> }
                </FormGroup>
                <FormGroup>
                    <Label title="Click the browse button bellow or paste the file path this drive will be mapped to">Path</Label>
                    <Input type="text" value={path} onChange={pathChanged} className={getClassName(pathErrMsg)}></Input>
                    { (pathErrMsg?.length ?? 0) === 0 ? null : <label className="error">{pathErrMsg}</label> }
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submit}>Save</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>);
}

export default AddAppDrive;