import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  };

  onChangeUsername = e => {
    this.setState({ username: e.target.value });
  };

  //connect to back-end w/ this method
  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    //send user data to create new user to the back-end using axios.
    //first argument is the rbackend endpoint, and this endpoint is expecting a json object in the request body.
    //so the second argument is the json object we're sending, which here is user.
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create new User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input 
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}