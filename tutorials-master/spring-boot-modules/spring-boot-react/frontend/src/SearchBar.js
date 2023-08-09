import React, {Component} from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {subject: '', grade: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        alert(this.state.subject + " " + this.state.grade);
        e.preventDefault();
    }

    render() {
        return (
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
        )
    }
}