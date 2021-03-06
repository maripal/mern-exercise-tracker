import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      //We have a users array here because there'll be a dropdown menu on our page, where you can select all the users that are on the database.
      users: []
    };
  };

  //This lifecycle method will be called right before anything gets displayed on the page.
  componentDidMount() {
    //get specific exercise
    axios.get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        });
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/users/')
      .then(response => {
        //check if there's a response; a user in the database
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            
          });
        }
      })
  };

  onChangeUsername = e => {
    this.setState({ username: e.target.value });
  };

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onChangeDuration = e => {
    this.setState({ duration: e.target.value });
  };

  onChangeDate = date => {
    this.setState({ date: date });
  };

  onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);

    axios.post(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, exercise)
      .then(res => console.log(res.data));

    //after exercise form is submitted
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(user => {
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Descrition: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription} 
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration} 
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker 
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}