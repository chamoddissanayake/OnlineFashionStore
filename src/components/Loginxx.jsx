import React from 'react';
import axios from 'axios';
import { login } from '../repository';
import { Redirect, Link } from 'react-router-dom';
import loginStyles from '../css/loginStyles.css';


export default class Loginxx extends React.Component {
  constructor() {
    super();
    this.state = { username: '', password: '' };

    this.state = {
      username: '',
      password: '',
      iscorrect: ''

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
  };
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    }, () => {
      // console.log("Entered Password: ", this.state.password);
    });
  };


  submitLogin = (event) => {
    // event.preventDefault();
    // login(this.state)
    //   .then(token => window.location = '/').catch(err => console.log(err));
    event.preventDefault();
    const loginUserObj = {
      username: this.state.username,
      password: this.state.password
    };
    // console.log(loginUserObj);




    axios.post(`/api/auth`, loginUserObj)
      .then((res) => {

        if (res.data) {
          // console.log(res.data);



          var loggedInUserObj = new Object();

          console.log(res.data.isFound);

          if (res.data.isFound == 'true') {
            loggedInUserObj._id = res.data._id;
            loggedInUserObj.username = res.data.username;
            loggedInUserObj.email = res.data.email;
            loggedInUserObj.type = res.data.type;



            this.setState({
              currentUser: loggedInUserObj
            })

            if (res.data.type == 'member') {
              localStorage.setItem("loggedInUser", JSON.stringify(loggedInUserObj));
              const { location } = this.props;
              if (location.state && location.state.from) {
                this.props.history.push(location.state.from);
              } else {
                this.props.history.push('/');
              }
              window.location.reload();
            } else if (res.data.type == 'manager') {
              localStorage.setItem("loggedInUser", JSON.stringify(loggedInUserObj));
              const { location } = this.props;
              if (location.state && location.state.from) {
                this.props.history.push(location.state.from);
              } else {
                this.props.history.push('/storeManager');
              }
              window.location.reload();
            } else if (res.data.type == 'admin') {
              const { location } = this.props;
              localStorage.setItem("loggedInUser", JSON.stringify(loggedInUserObj));
              if (location.state && location.state.from) {
                this.props.history.push(location.state.from);
              } else {
                //document.getElementById('root') == "";
                //this.props.history.push('/admin/');
                console.log('Admin');
              }
              window.location.reload();


            }


          } else if (res.data.isFound == 'false') {
            const { location } = this.props;
            if (location.state && location.state.from) {
              this.props.history.push(location.state.from);
            } else {
              this.props.history.push('/login');

              this.setState({
                isFound: 'Username or password incorrect',
                username: '',
                password: ''
              }, () => {

              });

            }
            console.log(this.state.isFound);
          }



        } else {
          alert("Incorrect Username or password");
        }

      }).catch((error) => {
        console.log(error)
      });

    this.setState({
      username: '',
      password: ''
    })




  }


  handleClickNewUser = (event) => {
    console.log("Handle New User Registration click");
    window.location.href = '/newUser';

  };

  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div id="loginHeading" className="panel-heading"><h3>Log in </h3></div>
            <div className="panel-body">
              <form onSubmit={this.submitLogin} method="POST" >
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
                <p>{this.state.isFound}</p>
                <div id="regButton">
                  <button type="submit" className="btn btn-success">Submit</button>
                </div>
              </form>
              <div>

                <p id="newLabel" onClick={this.handleClickNewUser} >New User ?</p>

              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}