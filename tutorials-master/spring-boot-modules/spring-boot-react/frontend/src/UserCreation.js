import React, { Component } from 'react';

export default class UserCreation extends React.Component {
  constructor(props) {
    super(props);
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
    */
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
    const response = await fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Role:
          <input type="text" name="Role:" value={this.state.role} onChange={this.handleChange} />
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
    );
  }
}