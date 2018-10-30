import '../App.css';
import React from 'react';
import AuthService from '../AuthService';
import { withGlobalState } from 'react-globally'


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      item: this.props.item,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(row_url, event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var newItem = this.state.item
    newItem[name] = value
    this.setState({
      item: newItem
    }, () => {
      this.update_row(row_url);
    });

  }


  delete_row(row_url) {
    fetch(row_url, {
      method: 'DELETE',
      headers: {
        'Authorization': this.Auth.getToken(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      })
    }).then((result) => {
      this.props.setGlobalState({
        work: []
      })
    }).then(() => {
      this.props.action()
    });
  }

  update_row(row_url) {
    fetch(row_url, {
      method: 'PUT',
      headers: {
        'Authorization': this.Auth.getToken(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: this.state.item.date,
        total_time: this.state.item.total_time,
        notes: this.state.item.notes,
      })
    }).then((result) => {
      this.props.action()
    });
  }

  render() {
    const success = 'bg-success'
    const danger = 'bg-danger'
    return (
      <tr className={(this.props.globalState && this.props.globalState.user && this.props.globalState.user[0]) ? (this.state.item.total_time > this.props.globalState.user[0].preferredworkinghourperday ? success : danger) : ''}>
        <td><input type="text" className="form-control" name="date" value={this.state.item.date} onChange={(event) => this.handleInputChange(this.state.item.url, event)} /></td>
        <td><input type="text" className="form-control" name="total_time" value={this.state.item.total_time} onChange={(event) => this.handleInputChange(this.state.item.url, event)} /></td>
        <td>
          <textarea className="form-control" name="notes" rows="3" onChange={(event) => this.handleInputChange(this.state.item.url, event)} value={this.state.item.notes} />
        </td>
        <td>
          <button className="btn btn-secondary" onClick={() => this.delete_row(this.state.item.url)}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default withGlobalState(Row)