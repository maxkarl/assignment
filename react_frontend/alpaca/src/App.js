import './App.css';
import React, { Component } from 'react';
import AuthService from './AuthService';
import { withGlobalState } from 'react-globally'
import Worker from './components/worker'
import Login from './components/login'

class App extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handler = this.handler.bind(this);
    this.state = {
      is_loggedin: this.Auth.loggedIn(),
    };
  }

  handler() {
    if (this.Auth.loggedIn()) {
      this.Auth.getUser(this.Auth.getToken()).then(response => {
        this.setState({
          is_loggedin: true,
        })
        this.props.setGlobalState({
          user: response,
        })
      })

    } else {
      this.setState({
        is_loggedin: false,
      })
      this.props.setGlobalState({
        user: [],
      })
    }
  }
  render() {
    return (
      <div>
        {this.state.is_loggedin ? <Worker action={this.handler} ></Worker> : <Login action={this.handler}></Login>}
      </div>
    );
  }
}
export default withGlobalState(App);
