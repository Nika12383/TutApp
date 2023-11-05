/*
//functional component please
import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

export default class UserCreation extends React.Component {
  constructor(props) {
    super(props);
    //think about the role state
    this.state = {role: '', name: '', pronouns: '', personalEmail: '', schoolEmail: '', adultEmail: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    /* if (event.target.name == "subject") {
        this.setState({subject: event.target.value});
    } else if {
        this.setState({grade: event.target.value});
    }

   switch (event.target.name) {
   case "Role:":
      this.setState({role: event.target.value})
      break;
   case "Name:":
     this.setState({name: event.target.value})
     break;
   case "Pronouns:":
     this.setState({pronouns: event.target.value})
     break;
   case "Personal Email:":
     this.setState({personalEmail: event.target.value})
     break;
   case "School Email:":
     this.setState({schoolEmail: event.target.value})
     break;
   case "Legal guardian Email:":
     this.setState({adultEmail: event.target.value})
     break;
   }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const userData = {role: this.state.role, name: this.state.name, pronouns: this.state.pronouns, personalEmail: this.state.personalEmail, schoolEmail: this.state.schoolEmail, adultEmail: this.state.adultEmail}
    //if (JSON.parse(userData).schoolEmail.contains("@gapps.yrdsb.ca")) {
        //console.log("Sup");
        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
   // }
   //console.log(userData.schoolEmail.contains("@gapps.yrdsb.ca"));
  }

  render() {
    return (
    <Container fluid>
      <form onSubmit={this.handleSubmit}>
        <label class="labels">
          Role:
          <select id="Selector" name="Role:" onChange={this.handleChange} >
            <option value="Tutor">Tutor</option>
            <option value="Student">Student</option>
          </select>
       </label>
        <label>
        Name:
          <input type="text" name="Name:" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Pronouns:
          <input type="text" name="Pronouns:" value={this.state.pronouns} onChange={this.handleChange} />
        </label>
        <label>
          Personal Email:
          <input type="text" name="Personal Email:" value={this.state.personalEmail} onChange={this.handleChange} />
        </label>
        <label>
          Legal guardian Email:
          <input type="text" name="Legal guardian Email:" value={this.state.adultEmail} onChange={this.handleChange} />
        </label>
        <label>
          School Email:
          <input type="text" name="School Email:" value={this.state.schoolEmail} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
  </Container>
    );
  }
}
*/
//functional component please
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

function UserCreation () {
    const [role, setRole] = useState('Tutor');
    const [name, setName] = useState([]);
    const [pronouns, setPronouns] = useState([]);
    const [personalEmail, setPersonalEmail] = useState([]);
    const [schoolEmail, setSchoolEmail] = useState([]);
    const [adultEmail, setAdultEmail] = useState([]);

  const handleChange = event => {
    /* if (event.target.name == "subject") {
        this.setState({subject: event.target.value});
    } else if {
        this.setState({grade: event.target.value});
    }
    */
    const action = event.target.name;
   switch (action) {
   case "Role:":
      setRole(event.target.value);
      break;
   case "Name:":
     setName(event.target.value);
     break;
   case "Pronouns:":
     setPronouns(event.target.value);
     break;
   case "Personal Email:":
     setPersonalEmail(event.target.value);
     break;
   case "School Email:":
     setSchoolEmail(event.target.value);
     break;
   case "Legal guardian Email:":
     setAdultEmail(event.target.value);
     break;
   }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const userData = {roleData: role, nameData: name, pronounsData: pronouns, personalEmailData: personalEmail, schoolEmailData: schoolEmail, adultEmailData: adultEmail}
    console.log(userData.emailData)
    if (userData.schoolEmailData.includes("@gapps.yrdsb.ca")) {
        console.log("Sup");
        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
   }
   //console.log(userData.schoolEmail.contains("@gapps.yrdsb.ca"));
  }

    return (
    <Container fluid>
      <form onSubmit={handleSubmit}>
        <label class="labels">
          Role:
          <select id="Selector" name="Role:" onChange={handleChange} >
            <option value="Tutor">Tutor</option>
            <option value="Student">Student</option>
          </select>
       </label>
        <label>
        Name:
          <input type="text" name="Name:" value={name} onChange={handleChange} />
        </label>
        <label>
          Pronouns:
          <input type="text" name="Pronouns:" value={pronouns} onChange={handleChange} />
        </label>
        <label>
          Personal Email:
          <input type="text" name="Personal Email:" value={personalEmail} onChange={handleChange} />
        </label>
        <label>
          Legal guardian Email:
          <input type="text" name="Legal guardian Email:" value={adultEmail} onChange={handleChange} />
        </label>
        <label>
          School Email:
          <input type="text" name="School Email:" value={schoolEmail} onChange={handleChange} />
        </label>
        <input id="submitButton" type="submit" value="Submit" />
      </form>
  </Container>
    );
}
export default UserCreation;