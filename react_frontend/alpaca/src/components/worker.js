import '../App.css';
import React from 'react';
import AuthService from '../AuthService';
import { withGlobalState } from 'react-globally'
import Work from './work'

class Worker extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      url: 'http://127.0.0.1:8000/customusers/',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.Auth = new AuthService();
    this.Auth.getUser(this.Auth.getToken()).then(response => {
      this.props.setGlobalState({
        user: response,
      })
    })
  }

  handleInputChange(event) {
    const user = this.props.globalState.user;
    user[0].preferredworkinghourperday = event.target.value;

    this.props.setGlobalState({
      user,
    }, () => {
      this.update_worker();
    });
  }

  update_worker() {
    fetch(this.state.url + this.props.globalState.user[0].id + '/', {
      method: 'PUT',
      headers: {
        'Authorization': this.Auth.getToken(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        preferredworkinghourperday: this.props.globalState.user[0].preferredworkinghourperday,
        username: this.props.globalState.user[0].username,
      })
    })
  }


  user_logout() {
    this.Auth.logout()
    this.props.action()
  }

  render() {
    return (
      <div className="Worker">
        <div className="container-fluid">
          <h1>Hello {this.props.globalState && this.props.globalState.user && this.props.globalState.user[0] ? this.props.globalState.user[0].username : ''}</h1>
          <div className="row">
            <div className="col-md-10">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-default">Preferred working hours per day</span>
                </div>
                <input type="text" className="form-control" aria-label="Preferred working hours per day" aria-describedby="inputGroup-sizing-default" name="preferredworkinghourperday" value={this.props.globalState && this.props.globalState.user && this.props.globalState.user[0] ? this.props.globalState.user[0].preferredworkinghourperday : 0} onChange={(event) => this.handleInputChange(event)} placeholder="Preferred working hour per day" />
              </div>
            </div>
            <div className="col-md-2"><button className="btn btn-block btn-secondary" onClick={() => this.user_logout()}>Logout</button></div>
          </div>
        </div>
        <hr />
        <Work user={this.props.globalState && this.props.globalState.user && this.props.globalState.user[0] ? this.props.globalState.user[0].username : ''}></Work>
      </div>
    );
  }
}
export default withGlobalState(Worker)  