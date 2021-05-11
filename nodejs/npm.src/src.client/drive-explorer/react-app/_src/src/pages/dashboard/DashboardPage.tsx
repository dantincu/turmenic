import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import AppPage from '../AppPage';
import { DashboardPageProps } from './DashboardPageProps';
import './DasboardPage.scss';

import {
    selectAllAppDrives,
    updateAppDrives,
    selectAllAppSessions,
    updateAppSessions
  } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

import AddDeviceAppDriveModal from '../../components/addDeviceFileSystemAppDrive/AddDeviceAppDriveModal';
import { AppDrive } from '../../src.node.common/app-data/device-app-drives/types';
import { AddAppDrive } from '../../src.node.common/app-data/device-app-drives/request.types';
import { ApiResponse } from '../../src.node.common.client/axios/api.types';
import { driveApi } from '../../api/drives.api';

const DashboardPage = (props: DashboardPageProps) => {
    const dispatch = useDispatch();

    const [addAppDriveModal, setAddAppDriveModal] = useState(false);
    const storeAppDrives = useSelector(selectAllAppDrives);

    const storeAppSessions = useSelector(selectAllAppSessions);

    const getAppDriveDescription = (ad: AppDrive) => {
        let description = ad.description ?? "";

        if (description.length === 0) {
            if (ad.deviceRootDirLocationUuid) {
                description = "Device file system folder";
            }
        }

        return description;
    }

    const getAppDriveTypeEl = (ad: AppDrive) => {
        const description = getAppDriveDescription(ad);
        return <label className="trmrk-drive-type">({ description })</label>;
    }

    const getAddAppDrivesOptionTitle = () => {
        const addDriveFirstOrMore = storeAppDrives.length > 0 ? "more drives" : "a drive";
        const title = `Choose one of the options bellow to add ${addDriveFirstOrMore} to the app`;

        return title;
    }

    const getAppDrivesComponents = () => {
        if (storeAppDrives.length > 0) {
            return (<div className="trmrk-all-app-drives">
                <p className="trmrk-app-drives-header-text">Here is a complete list of all drives you've added to the app</p>
                <ul className="trmrk-drives-list"> {
                storeAppDrives.map(ad => {
                    const domEl = (<li className="trmrk-app-drive-item">
                        <label className="trmrk-drive-label" title={ad.rootFolder.path ?? ""}>{ad.label ?? ad.rootFolder.name}</label>{' '}
                        { getAppDriveTypeEl(ad) }
                        </li>);
                    return domEl;
                })
            } </ul>
            </div>);
        } else {
            return (<div><p className="trmrk-app-drives-list-empty">You haven't yet added any drives to your app.</p></div>)
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

    const getAddAppSessionOptionTitle = () => {
        const addSessionFirstOrNew = storeAppSessions.length > 0 ? "a new blank app session" : "a blank app session";
        const title = `Click this button to add ${addSessionFirstOrNew}`;

        return title;
    }

    const addBlankNewAppSession = () => {

    }

    return (<AppPage>
        <h1>Dashboard</h1>
        <h4 className="trmrk-page-section-title">All app drives</h4>
        {getAppDrivesComponents()}
        <div className="trmrk-add-app-drives-options">
            <p className="trmrk-add-app-drives-options-title">{getAddAppDrivesOptionTitle()}</p>
            <Row>
                <Col className="trmrk-add-app-drive-option">
                    <label className="trmrk-add-app-drive-opt-descr">Add a drive mapped to a folder on your <span className="trmrk-add-app-drive-opt-descr-emph">device's file system</span></label>&nbsp;&nbsp;
                    <Button color="primary" onClick={addAppDriveModalToggle}>Add app drive</Button>
                </Col>
            </Row>
        </div>
        <h4 className="trmrk-page-section-title">All app sessions</h4>
        <div className="trmrk-all-app-sessions">

        </div>
        <div className="trmrk-add-app-session">
            <p className="trmrk-add-app-session-title">{getAddAppSessionOptionTitle()}&nbsp;&nbsp;<Button color="primary" onClick={addBlankNewAppSession}>Add app session</Button></p>
        </div>
        <AddDeviceAppDriveModal isOpen={addAppDriveModal} toggle={addAppDriveModalToggle} onSubmit={onAddAppDriveSubmitted}></AddDeviceAppDriveModal>
    </AppPage>);
};

export default DashboardPage;