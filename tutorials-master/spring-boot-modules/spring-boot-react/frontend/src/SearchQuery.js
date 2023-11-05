import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppNavbar from './AppNavbar';
import './SearchQuery.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SearchQuery() {
    const [response, setResponse] = useState([]);
    const [role, setRole] = useState('Tutor');
    const [subject, setSubject] = useState('All');
    const [grade, setGrade] = useState('All');
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('testing');
    const [userRole, setURole] = useState('testing');
    const [userGrade, setUGrade] = useState('testing');
    const [userSubject, setUSubject] = useState('testing');
    const [userEmail, setUEmail] = useState('testing');

    const { user, isAuthenticated } = useAuth0();

    const handleOpen = (name, role, grade, subject, email) => {
        setName(name);
        setURole(role);
        setUGrade(grade);
        setUSubject(subject);
        setUEmail(email);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const search = async (role, subject, grade) => {
        const r = await fetch(`/query/${role}/${subject}/${grade}`);
        const searchResults = await r.json();
        setResponse(searchResults);
        setAmount(parseInt(searchResults.records.length));
    };

    useEffect(() => {
        search(role, subject, grade);
    }, []);

    const handleChange = e => {
        const action = e.target.name;
        switch (action) {
            case "role":
                setRole(e.target.value);
                break;
            case "subject":
                setSubject(e.target.value);
                break;
            case "grade":
                setGrade(e.target.value);
                break;
        };
    };

    const handleSubmit = e => {
            search(role, subject, grade)
            e.preventDefault();
    }


    const users = response.records
    let userList = ''
    switch (users) {
        case "You messed up your syntax or are trying to inject sql":
            userList = <p>You messed up your syntax or are trying to inject sql.</p>;
            break;
        case "Database Connection Error":
            userList = <p>Database Connection Error</p>
            break;
        case "How you got this error message is beyond me ;-;":
            <p>How you got this error message is beyond me ;-;</p>
        default:
            if (users?.length == 0) {
                userList = <p>No Users Found</p>
            } else {
                userList = users?.map(user => {
                    return <tr>
                        <td>
                        <Container fluid className="block-example border border-dark">
                        <h4 id="namelabel">{user[1]}</h4>
                        <hr />
                        <p id="gradelabel">{user[3]}-Grade {user[5]} {user[4]}</p>
                        {isAuthenticated ? //todo add second condition for checking if they are in the database
                        <Button color="primary" onClick={() => handleOpen(user[1], user[3], user[5], user[4], user[2])}>Contact</Button>
                        : <p>Please log in to contact!</p>}
                        </Container>
                        </td>
                    </tr>
                });
            }
    }

    return (
    <>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Hello! I am a {userRole} for Grade {userGrade} {userSubject}! Contact me at: < a href={"mailto:"+userEmail}>{userEmail}< /a>
              </Typography>
            </Box>
          </Modal>
            <AppNavbar/>
            <div class="rowC">
            <div class="sidebar">
            <Container fluid>
                    <form onSubmit={handleSubmit}>
                        <label class="labels">
                          Role:
                          <select id="Selector" name="role" onChange={handleChange}>
                                <option value="Tutor">Tutor</option>
                                <option value="Student">Student</option>
                              </select>
                        </label>
                        <label class="labels">
                           Subject:
                           <select id="Selector" name="subject" onChange={handleChange}>
                             <option value="All">All</option>
                             <option value="Math">Math</option>
                             <option value="English">English</option>
                             <option value="History">History</option>
                             <option value="Geography">Geography</option>
                             <option value="French">French</option>
                             <option value="Chemistry">Chemistry</option>
                           </select>
                        </label>
                        <label class="labels">
                           Grade:
                           <select id="Selector" name="grade" onChange={handleChange}>\
                             <option value="All">All</option>
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             <option value="5">5</option>
                             <option value="6">6</option>
                             <option value="7">7</option>
                             <option value="8">8</option>
                             <option value="9">9</option>
                             <option value="10">10</option>
                             <option value="11">11</option>
                             <option value="12">12</option>
                           </select>
                        </label>
                        <input id="submitButton" type="submit" value="Submit" />
                    </form>
           </Container>
           </div>
           <div class="users">
           <Container fluid>
               <h3>{amount} Users Found</h3>
               <Table className="mt-4">
                   <tbody>
                   {userList}
                   </tbody>
               </Table>
           </Container>
           </div>
           </div>
        </div>
    </>
    );
}

export default SearchQuery;