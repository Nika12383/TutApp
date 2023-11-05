import React, { useState, useEffect } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import UserCreation from './UserCreation';
import { Link , useNavigate } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import UserSubject from './UserSubject';
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
     const { user, isAuthenticated } = useAuth0();
     const [survey, setSurvey] = useState(false);
     const [foundInDb, setFoundInDb] =  useState(true);
     let navigate = useNavigate();

     const search = async (email) => {
             const r = await fetch(`/email/${email}`);
             const searchResults = await r.json();
             const result = JSON.parse(searchResults.records);
             setFoundInDb(result);
         };

     useEffect(() => {
              if (isAuthenticated) {
              search(user.email);
                  if (foundInDb == false) {
                      console.log("not in db")
                      setSurvey(true);
                  }
              }
         }, [isAuthenticated, foundInDb]);

    if (survey) {
        return navigate("/survey");
       }

    return (
        <div>
            <AppNavbar/>
            <UserCreation/> //todo get these two out of here
            <UserSubject/>
            <Container fluid>
                <Button color="link"><Link to="/query">Search</Link></Button>
                <Button color="link"><Link to="/testpage">Testing</Link></Button>
            </Container>
        </div>
    );
};

export default Home;