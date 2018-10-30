import '../App.css';
import React from 'react';
import AuthService from '../AuthService';
import { withGlobalState } from 'react-globally'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();

  }

  user_login() {
    this.Auth.login(this.refs.username.value, this.refs.password.value).then(() => {
      this.props.action()
    })
  }

  user_registration() {
    this.Auth.register(this.refs.registration_username.value, this.refs.registration_email.value, this.refs.registration_password_one.value, this.refs.registration_password_two.value).then(() => {
      this.props.action()
    })
  }

  render() {
    return (
      <div className="Login">
        <div className="container">
          <div className="logindetails">
            <h2>Sign in:</h2>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="username" ref="username" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="password" ref="password" />
            </div>
            <button className="btn btn-secondary btn-lg btn-block" onClick={() => this.user_login()}>Login</button>
          </div>
          <div className="logindetails">
            <h2>Registrate:</h2>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="username" ref="registration_username" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="email" ref="registration_email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="password" ref="registration_password_one" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="password validation" ref="registration_password_two" />
            </div>
            <button className="btn btn-secondary btn-lg btn-block" onClick={() => this.user_registration()}>Registrate</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withGlobalState(Login)  