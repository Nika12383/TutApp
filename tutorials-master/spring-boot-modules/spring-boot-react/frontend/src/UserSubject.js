import React, { Component } from 'react';

export default class UserSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', subject: '', grade: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
        case "Name:":
            this.setState({name: event.target.value})
            break;
        case "Subject:":
            this.setState({subject: event.target.value})
            break;
        case "Grade:":
            this.setState({grade: event.target.value})
            break;
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const userData = {name: this.state.name, subject: this.state.subject, grade: this.state.grade}
        const response = await fetch('/assign', {
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
                  Name:
                  <input type="text" name="Name:" value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>
                  Subject:
                  <input type="text" name="Subject:" value={this.state.subject} onChange={this.handleChange} />
                </label>
                <label>
                  Grade:
                  <input type="text" name="Grade:" value={this.state.grade} onChange={this.handleChange} />
                </label>
                <input type="submit" value="submit" />
            </form>

        );
    }
}