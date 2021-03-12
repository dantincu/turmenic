import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';

import { DashboardPageProps } from './DashboardPageProps';

const DashboardPage = (props: DashboardPageProps) => {
    return (<main className="txqk-app-main">
        <Container className="txqk-app-cntr">
        </Container>
    </main>);
};

export default DashboardPage;