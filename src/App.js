import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Header from './layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';
import PropTypes from 'prop-types';

class App extends React.Component {
  // this is the App-level state
  constructor() {
    super();

    this.state = {
      todos: []
    }
  }

  componentDidMount () {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
    // this will give us a promise with a response that has a data property attached
      .then(res => this.setState({ todos: res.data }));
  }


// toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }

  // delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
    // this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }
 // Add Todo
  addTodo = (title) => {
   axios.post('https://jsonplaceholder.typicode.com/todos',  {
     title,
     completed: false
   })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }


  render(){
    return (
      <Router>
        <div className="App">
          <div className = 'container'>
            <Header />
            <Route exact path = '/' render = { props => (
              <React.Fragment>
                <AddTodo addTodo = { this.addTodo } />
                <Todos todos= {this.state.todos} 
                  markComplete = {this.markComplete} 
                  delTodo = { this.delTodo} />
              </React.Fragment>
            ) } />
            <Route path = '/about' component = { About } />
          </div>
        </div>
      </Router>
    );
  }
}


// PropTypes
Todos.propTypes = {
  addTodo: PropTypes.func.isRequired
}



export default App;
