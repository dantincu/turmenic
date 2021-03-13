import React from 'react';
import { Container } from 'reactstrap';

import { PageProps } from './AppPageProps';

const AppPage = (props: PageProps) => {
    return (<main className="txqk-app-main">
        <Container className="txqk-app-cntr">
            {(props as any).children}
        </Container>
    </main>);
};

export default AppPage;
