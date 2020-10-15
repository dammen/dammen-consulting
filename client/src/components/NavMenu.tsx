import React, {FunctionComponent, useState, useContext} from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {ConfigContext} from '../contexts/config';
import './NavMenu.css';

interface Props {

}

export const NavMenu: FunctionComponent = (props) => {

    const [collapsed, setCollapsed] = useState(true);

    const config = useContext(ConfigContext);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">Dammen Consulting</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/projects">Projects</NavLink>
                            </NavItem>
                            {config && config.isLoggedIn ?
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/Account/Manage/Index">{config.name}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/Account/logout">Login</NavLink>
                                    </NavItem>
                                </>
                                :
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/Account/Login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/Account/Register">Register</NavLink>
                                    </NavItem>
                                </>
                            }

                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
