import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';

import AppPage from '../AppPage';
import { DashboardPageProps } from './DashboardPageProps';

import {
    selectFolder,
    selectAllAppDrives,
    selectFile,
  } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

import { driveApi } from '../../api/drives.api';
import { FileSystemRootFolder } from "../../js.common/src.node.common/app-data/fileSystem.types";

import AddAppDrive from '../../components/addAppDrive/AddAppDrive';
import { AddAppDriveProps } from '../../components/addAppDrive/AddAppDriveProps';
import { NewAppDrive } from '../../api/api.types';

const DashboardPage = (props: DashboardPageProps) => {
    const [addAppDriveModal, setAddAppDriveModal] = useState(false);
    const appDrives = useSelector(selectAllAppDrives);

    const getAppDrivesComponents = () => {
        if (appDrives.length > 0) {
            return (<div>
                <p>Here is a complete list of all local app drives</p>
                <ul> {
                appDrives.map(ad => {
                    <li><label title={ad.rootFolder.path}>{ad.label ?? ad.rootFolder.name}</label></li>
                })
            } </ul>
            <p>Click the button bellow to add more drives to the app</p>
            </div>);
        } else {
            return (<div><p>You haven't yet added any drives to your app.<br />Click the button bellow to add an app drive</p></div>)
        }
    }

    const onAddAppDriveSubmitted = (newAppDrive: NewAppDrive) => {

    }

    const addAppDriveModalToggle = () => {
        setAddAppDriveModal(!addAppDriveModal);
    }

    return (<AppPage>
        <h5>Local app drives</h5>
        {getAppDrivesComponents()}
        <Button color="primary" onClick={addAppDriveModalToggle}>Add</Button>
        <AddAppDrive isOpen={addAppDriveModal} toggle={addAppDriveModalToggle} onSubmit={onAddAppDriveSubmitted}></AddAppDrive>
    </AppPage>);
};

export default DashboardPage;