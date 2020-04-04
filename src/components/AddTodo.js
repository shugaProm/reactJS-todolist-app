import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class AddTodo extends Component {
    // this is a component-level state
    constructor() {
        super ();

        this.state = {
            title: ''
        }
    }

    onSubmit = (e) => {
        // prevent sending the form to the actual file
        e.preventDefault();
        // call props method to pass it up like other handlers
        this.props.addTodo(this.state.title);
        // when the above is done, set the state back to nothing.
        this.setState({ title: '' });
    }

    onChange = (e) => this.setState({ title: e.target.value });
    /* the more appropriate way to do this when we have more input fields with name 
    attributes would be using an object for e.target.name in array and accessing 
    the fields respestively:
        onChange = (e) => this.setState({ [e.target.name]: e.target.value});
    */

    render() {
        return (
            <form style = {{ display: 'flex' }} onSubmit = { this.onSubmit } >
                <input type ='text' 
                name = 'title' 
                placeholder = 'Add Todo ...'
                style = {{ flex: '10', padding: '5px' }}
                value = { this.state.title }
                onChange = { this.onChange }
                />
                <input type = 'submit'
                value = 'Submit'
                className = 'btn'
                style = {{ flex: '1' }}
                />
            </form>
        )
    }
}


// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.object.isRequired
}


export default AddTodo;
