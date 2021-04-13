import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

import AppPage from '../AppPage';
import { DashboardPageProps } from './DashboardPageProps';

import {
    selectAllAppDrives,
  } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

import AddAppDriveModal from '../../components/addAppDrive/AddAppDriveModal';
import { DeviceRootDirLocation } from "../../src.node.common/app-data/schema/device-dir-locations.schema";
import { ApiResponse } from '../../api/api.types';
import { driveApi } from '../../api/drives.api';

const DashboardPage = (props: DashboardPageProps) => {
    const [storeAppDrivesLoaded, setStoreAppDrivesLoaded] = useState(false);
    const [storeAppDrivesLoading, setStoreAppDrivesLoading] = useState(false);

    const [addAppDriveModal, setAddAppDriveModal] = useState(false);
    const storeAppDrives = useSelector(selectAllAppDrives);

    useEffect(() => {
        const fetchData = async () => {
            const apiResponse = await driveApi.getDeviceAppDrives();
            if ((apiResponse.response?.status ?? 400) < 300) {
                const retAppDrives = apiResponse.result ?? [];
            }
            setStoreAppDrivesLoaded(true);
        }

        if (!storeAppDrivesLoaded) {
            if (!storeAppDrivesLoading) {
                fetchData();
                setStoreAppDrivesLoading(true);
            }
        }
    }, []);

    const getAppDrivesComponents = () => {
        if (storeAppDrives.length > 0) {
            return (<div>
                <p>Here is a complete list of all local app drives</p>
                <ul> {
                storeAppDrives.map(ad => {
                    <li><label title={ad.rootFolder.path ?? ""}>{ad.label ?? ad.rootFolder.name}</label></li>
                })
            } </ul>
            <p>Click the button bellow to add more drives to the app</p>
            </div>);
        } else {
            return (<div><p>You haven't yet added any drives to your app.<br />Click the button bellow to add an app drive</p></div>)
        }
    }

    const onAddAppDriveSubmitted = async (newAppDrive: DeviceRootDirLocation): Promise<ApiResponse<DeviceRootDirLocation[], any>> => {
        return {

        } as ApiResponse<DeviceRootDirLocation[], any>;
    }

    const addAppDriveModalToggle = () => {
        setAddAppDriveModal(!addAppDriveModal);
    }

    return (<AppPage>
        <h5>Local app drives</h5>
        {getAppDrivesComponents()}
        <Button color="primary" onClick={addAppDriveModalToggle}>Add</Button>
        <AddAppDriveModal isOpen={addAppDriveModal} toggle={addAppDriveModalToggle} onSubmit={onAddAppDriveSubmitted}></AddAppDriveModal>
    </AppPage>);
};

export default DashboardPage;