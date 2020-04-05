import React from 'react';
import axios from 'axios';
import { login } from '../repository';

const BASE_URL = 'http://localhost:5000';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = { username: '', password: '' };

    this.state = {
      username: '',
      password: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    }, () => {
      // console.log("Entered Username: ", this.state.username);
    });
  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    }, () => {
      // console.log("Entered Password: ", this.state.password);
    });
  }


  submitLogin = (event) => {
    // event.preventDefault();
    // login(this.state)
    //   .then(token => window.location = '/').catch(err => console.log(err));

    const loginUserObj = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(loginUserObj);


    axios.post(`${BASE_URL}/api/auth`, loginUserObj)
      .then((res) => {
        alert('Back');
        // console.log(res.data)
        // if (res.data == true) {
        //   alert('Added to DB successfully');
        // } else {
        //   alert('Something Went wrong!');
        // }

      }).catch((error) => {
        console.log(error)
      });

    this.setState({
      username: '',
      password: ''
    })




  }

  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading"><h3>Log in </h3></div>
            <div className="panel-body">
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control"
                    name="name" onChange={this.handleUsernameChange} />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control"
                    name="password" onChange={this.handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  }

}