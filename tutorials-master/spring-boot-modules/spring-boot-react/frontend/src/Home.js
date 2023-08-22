import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import UserCreation from './UserCreation';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import UserSubject from './UserSubject';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <UserCreation/>
                <UserSubject/>
                <Container fluid>
                    <Button color="link"><Link to="/query">Search</Link></Button>
                    <Button color="link"><Link to="/testpage">Testing</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;