import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import AppPage from '../AppPage';
import { DashboardPageProps } from './DashboardPageProps';
import './DasboardPage.scss';

import {
    selectAllAppDrives,
    updateAppDrives
  } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

import AddAppDriveModal from '../../components/addAppDrive/AddAppDriveModal';
import { AppDrive } from '../../src.node.common/app-data/device-app-drives/types';
import { AddAppDrive } from '../../src.node.common/app-data/device-app-drives/request.types';
import { ApiResponse } from '../../src.node.common.client/axios/api.types';
import { driveApi } from '../../api/drives.api';

const DashboardPage = (props: DashboardPageProps) => {
    const dispatch = useDispatch();

    const [addAppDriveModal, setAddAppDriveModal] = useState(false);
    const storeAppDrives = useSelector(selectAllAppDrives);

    const getAppDrivesComponents = () => {
        if (storeAppDrives.length > 0) {
            return (<div>
                <p>Here is a complete list of all local app drives</p>
                <ul> {
                storeAppDrives.map(ad => {
                    const domEl = (<li><label title={ad.rootFolder.path ?? ""}>{ad.label ?? ad.rootFolder.name}</label></li>);
                    return domEl;
                })
            } </ul>
            <p>Click the button bellow to add more drives to the app</p>
            </div>);
        } else {
            return (<div><p>You haven't yet added any drives to your app.<br />Click the button bellow to add an app drive</p></div>)
        }
    }

    const onAddAppDriveSubmitted = async (newAppDrive: AddAppDrive): Promise<ApiResponse<AppDrive, any>> => {
        const apiResponse = await driveApi.addAppDrive(newAppDrive);

        if (!apiResponse.error && apiResponse.result) {
            dispatch(updateAppDrives({ deviceAppDrives: [...storeAppDrives, apiResponse.result]}));
        }

        return apiResponse;
    }

    const addAppDriveModalToggle = () => {
        setAddAppDriveModal(!addAppDriveModal);
    }

    return (<AppPage>
        <h5 className="trmrk-page-title">Local app drives</h5>
        {getAppDrivesComponents()}
        <Button color="primary" onClick={addAppDriveModalToggle}>Add</Button>
        <AddAppDriveModal isOpen={addAppDriveModal} toggle={addAppDriveModalToggle} onSubmit={onAddAppDriveSubmitted}></AddAppDriveModal>
    </AppPage>);
};

export default DashboardPage;