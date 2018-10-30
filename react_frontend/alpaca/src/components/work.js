import '../App.css';
import React from 'react';
import AuthService from '../AuthService';
import { withGlobalState } from 'react-globally'
import Row from './row'

class Work extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      worker_url: 'http://127.0.0.1:8000/customusers/',
    };
    this.get_rows = this.get_rows.bind(this);
  }

  get_rows() {
    fetch("http://127.0.0.1:8000/work-by-user/", {
      method: 'GET',
      headers: {
        'Authorization': this.Auth.getToken(),
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(
        (result) => {
          this.props.setGlobalState({
            work: result
          });
        },
        (error) => {
          return error;
        }
      )
  }

  componentWillMount() {
    this.get_rows()
  }

  create_row() {
    fetch('http://127.0.0.1:8000/work/', {
      method: 'POST',
      headers: {
        'Authorization': this.Auth.getToken(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: this.refs.new_date.value,
        total_time: this.refs.new_total_time.value,
        notes: this.refs.new_notes.value,
        worker: this.state.worker_url + this.props.globalState.user[0].id + '/',
      })
    })
    var newWork = this.props.globalState.work.slice();
    newWork.push({
      date: this.refs.new_date.value,
      total_time: this.refs.new_total_time.value,
      notes: this.refs.new_notes.value,
      worker: this.props.globalState.user[0].id,
    })

    this.refs.new_date.value = ''
    this.refs.new_total_time.value = ''
    this.refs.new_notes.value = ''

    this.props.setGlobalState(prevState => ({
      work: newWork
    }));
  }

  filter_by_date() {
    this.props.setGlobalState({
      work: []
    })
    fetch("http://127.0.0.1:8000/work-by-user-date/?filter_from=" + this.refs.filter_from.value + "&filter_to=" + this.refs.filter_to.value, {
      method: 'GET',
      headers: {
        'Authorization': this.Auth.getToken(),
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(
        (result) => {
          this.props.setGlobalState({
            work: result
          });
        },
        (error) => {
          return error;
        }
      )
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <input type="text" className="form-control" ref="filter_from" placeholder="From date (yyyy-mm-dd)" />
            </div>
            <div className="col-md-5">
              <input type="text" className="form-control" ref="filter_to" placeholder="To date (yyyy-mm-dd)" />
            </div>
            <div className="col-md-2">
              <button className="btn btn-block btn-secondary" onClick={() => this.filter_by_date()}>Filter</button>
            </div>
          </div>
        </div>
        <hr />

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Total time</th>
              <th scope="col">Notes</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(this.props.globalState && this.props.globalState.work && this.props.globalState.work[0]) ? (this.props.globalState.work.map(item => (
              <Row
                item={item}
                action={this.get_rows}
              />
            ))) : ''}
            <tr>
              <td><input type="text" className="form-control" ref="new_date" placeholder="Date (yyyy-mm-dd)" /></td>
              <td><input type="text" className="form-control" ref="new_total_time" placeholder="Total time (in hours)" /></td>
              <td>
                <textarea className="form-control" ref="new_notes" placeholder="Your notes" rows="3"></textarea>
              </td>
              <td>
                <button className="btn btn-secondary" onClick={() => this.create_row()}>Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withGlobalState(Work)