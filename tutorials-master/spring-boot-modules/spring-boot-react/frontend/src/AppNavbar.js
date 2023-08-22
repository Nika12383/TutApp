import React, { useState } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import "./AppNavbar.css";

function AppNavbar() {
    const [isOpen, setOpen] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    const toggle = () => {
        setOpen(!isOpen);
    };

    const status = isAuthenticated ? <div class = "topnav-right">
                                     <NavbarBrand id="test">Welcome {user.name}</NavbarBrand>
                                     <LogoutButton/>
                                     </div> :
                                     <div class = "topnav-right">
                                     <LoginButton/>
                                     </div>;

    return (
        <Navbar color="dark" dark expand="md">
           <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
           <NavbarBrand tag={Link} to="/query">Find Users</NavbarBrand>
           {status}
        </Navbar>
    );
}

export default AppNavbar;