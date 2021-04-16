import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useDispatch } from 'react-redux';

import { PageProps } from "./AppPageProps";
import { ApiResponse } from '../src.node.common.client/axios/api.types';
import { driveApi } from '../api/drives.api';

import {
  updateAppDrives,
} from "../app/deviceAppDriveItems/deviceAppDriveItems";

const AppPage = (props: PageProps) => {
  const dispatch = useDispatch();

  const [storeAppDrivesLoaded, setStoreAppDrivesLoaded] = useState(false);
  const [storeAppDrivesLoading, setStoreAppDrivesLoading] = useState(false);
  const [storeAppDrivesLoadedError, setStoreAppDrivesLoadedError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const apiResponse = await driveApi.getDeviceAppDrives(true);

        if ((apiResponse.response?.status ?? 400) < 300) {
            dispatch(updateAppDrives({ deviceAppDrives: apiResponse.result ?? [] }));
            setStoreAppDrivesLoaded(true);
        } else {
          setStoreAppDrivesLoadedError(true);
        }
    }

    if (!storeAppDrivesLoaded) {
        if (!storeAppDrivesLoading) {
            fetchData();
            setStoreAppDrivesLoading(true);
        }
    }
  }, []);

  const getChildren = () => {
    let children: JSX.Element[] = [];

    if (storeAppDrivesLoadedError) {
      children = [(
        <div className="trmrk-app-error">
          <p className="trmrk-error-msg">
            Something went wrong and the app drives could not be loaded...
          </p>
        </div>
      )];
    } else if (storeAppDrivesLoaded) {
      children = (props as any).children;
      
    } else if (storeAppDrivesLoading) {
      children = [(
        <div className="trmrk-app-loading">
          <h3 className="trmrk-info-title">Loading the app drives...</h3>
        </div>
      )];
    }

    return children;
  }

  return (
    <main className="trmrk-app-main">
      <Container className="trmrk-app-cntr">{getChildren()}</Container>
    </main>
  );
};

export default AppPage;
