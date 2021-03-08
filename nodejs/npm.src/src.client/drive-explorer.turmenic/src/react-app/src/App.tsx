import React from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import './styles/App.scss';

import DriveExplorer from './components/driveExplorer/DriveExplorer';

const App = () => {
    return (
        <div className="txqk-app">
            <header className="txqk-app-header"></header>
            <main className="txqk-app-main">
                <Container className="txqk-app-cntr">
                    <Nav>
                        <NavItem>
                            <NavLink className="txqk-app-link" href="#">Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="txqk-app-link" href="#">Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="txqk-app-link" href="#">Another Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="txqk-app-link" disabled href="#">Disabled Link</NavLink>
                        </NavItem>
                    </Nav>
                    <DriveExplorer></DriveExplorer>
                </Container>
            </main>
            <footer className="txqk-app-footer"></footer>
        </div>
    );
};

export default App;