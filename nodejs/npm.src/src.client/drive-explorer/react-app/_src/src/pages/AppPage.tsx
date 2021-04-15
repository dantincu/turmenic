import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useDispatch } from 'react-redux';

import { PageProps } from "./AppPageProps";
import { ApiResponse } from '../api/api.types';
import { driveApi } from '../api/drives.api';

import {
  updateAppDrives,
} from "../app/deviceAppDriveItems/deviceAppDriveItems";

const AppPage = (props: PageProps) => {
  const dispatch = useDispatch();

  const [storeAppDrivesLoaded, setStoreAppDrivesLoaded] = useState(false);
  const [storeAppDrivesLoading, setStoreAppDrivesLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const apiResponse = await driveApi.getDeviceAppDrives();
        if ((apiResponse.response?.status ?? 400) < 300) {
            dispatch(updateAppDrives({ deviceAppDrives: apiResponse.result ?? [] }));
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

  return (
    <main className="trmrk-app-main">
      <Container className="trmrk-app-cntr">{(props as any).children}</Container>
    </main>
  );
};

export default AppPage;
