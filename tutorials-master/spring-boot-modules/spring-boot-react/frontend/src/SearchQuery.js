import React, { Component } from 'react';
import { useState } from "react";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';
import AppNavbar from './AppNavbar';
import './SearchQuery.css';


class SearchQuery extends Component {

    constructor(props) {
        super(props);
        this.state = {response: [], role: 'Tutor', subject: 'All', grade: 'All', amount: ''};
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async search(role, subject, grade) {
        const response = await fetch(`/query/${role}/${subject}/${grade}`);
        const searchResults = await response.json();
        this.setState({response: searchResults, amount: searchResults.records.length});
    }

    componentDidMount() {
        this.search(this.state.role, this.state.subject, this.state.grade);
    }

    handleChange(e) {
            const action = e.target.name;
            console.log(action)
            switch (action) {
                case "role":
                    this.setState({role: e.target.value});
                    console.log(e.target.value)
                    break;
                case "subject":
                    this.setState({subject: e.target.value});
                    break;
                case "grade":
                    this.setState({grade: e.target.value})
                    break;
            }
        }

    handleSubmit(e) {
        this.search(this.state.role, this.state.subject, this.state.grade)
        e.preventDefault();
    }

    render() {
        const tutors = this.state.response.records;
        let tutorList = ''
        switch (tutors) {
            case "You messed up your syntax or are trying to inject sql":
                tutorList = <p>You messed up your syntax or are trying to inject sql.</p>;
                break;
            case "Database Connection Error":
                tutorList = <p>Database Connection Error</p>
                break;
            case "How you got this error message is beyond me ;-;":
                <p>How you got this error message is beyond me ;-;</p>
            default:
                if (tutors?.length == 0) {
                    tutorList = <p>No Users Found</p>
                } else {
                    tutorList = tutors?.map(tutor => {
                        return <tr>
                            <td>
                            <div class="user">
                            <h4 id="namelabel">{tutor[1]}</h4>
                            <hr />
                            <p id="gradelabel">{tutor[3]}-Grade {tutor[5]} {tutor[4]}</p>
                            </div>
                            </td>
                        </tr>
                    });
                }

        }
        return (
            <div>
                <AppNavbar/>
                <div class="rowC">
                <div class="sidebar">
                <Container fluid>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                              Role:
                              <select name="role" onChange={this.handleChange}>
                                <option value="Tutor">Tutor</option>
                                <option value="Student">Student</option>
                              </select>
                            </label>
                            <label>
                              Subject:
                              <input type="text" name='subject' value={this.state.subject} onChange={this.handleChange} />
                            </label>
                            <label>
                              Grade:
                              <input type="text" name='grade' value={this.state.grade} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
               </Container>
               </div>
               <div class="users">
               <Container fluid>
                   <h3>{this.state.amount} Users Found</h3>
                   <Table className="mt-4">
                       <tbody>
                       {tutorList}
                       </tbody>
                   </Table>
               </Container>
               </div>
               </div>
            </div>
        );
    }
}

export default SearchQuery;