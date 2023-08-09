import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class SearchQuery extends Component {

    constructor(props) {
        super(props);
        this.state = {response: [], subject: '', grade: ''};
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async search(subject, grade) {
        const response = await fetch(`/query/${subject}/${grade}`);
        const searchResults = await response.json();
        this.setState({response: searchResults});
    }

    handleChange(e) {
            const action = e.target.name;
            if (action == 'subject') {
                this.setState({subject: e.target.value})
            } else {
                this.setState({grade: e.target.value})
            }
        }

    handleSubmit(e) {
        this.search(this.state.subject, this.state.grade)
        e.preventDefault();
    }

    render() {
        const tutors = this.state.response.records;
        let tutorList = ''
        switch (tutors) {
            case "No Users Found":
                tutorList = <p>No Users Found</p>;
                break;
            case "Database Connection Error":
                tutorList = <p>Database Connection Error</p>
                break;
            default:
                tutorList = tutors?.map(tutor => {
                    return <tr>
                        <td>{tutor[1]}</td>
                        <td>{tutor[2]}</td>
                        <td>{tutor[3]}</td>
                    </tr>
                });
        }
        return (
            <div>
                <AppNavbar/>
                <form onSubmit={this.handleSubmit}>
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
                   <Container fluid>
                       <Table className="mt-4">
                           <thead>
                           <tr>
                               <th width="30%">Name</th>
                               <th width="30%">Pronouns</th>
                               <th width="40%">Email</th>
                           </tr>
                           </thead>
                           <tbody>
                           {tutorList}
                           </tbody>
                       </Table>
                   </Container>
            </div>
        );
    }
}

export default SearchQuery;