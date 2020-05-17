import React, { Component } from 'react'
import newUserStyles from '../css/newUserStyles.css';

import axios from 'axios';

import { Link } from 'react-router-dom';



export default class newUserRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repassword: '',
            loading: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }


    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleRePasswordChange(event) {
        this.setState({
            repassword: event.target.value
        })
    }


    handleRegisterSubmit() {

        if (this.state.password != this.state.repassword) {
            alert('Passwords are not equal');
        } else {
            this.setState({
                loading: true
            });

            console.log(this.state.username);
            console.log(this.state.email);
            console.log(this.state.password);
            console.log(this.state.repassword);

            var tempObj = {}
            tempObj.username = this.state.username;
            tempObj.password = this.state.password;
            tempObj.email = this.state.email;



            axios.post(`http://localhost:5000/api/registerUser`, tempObj)
                .then((res) => {

                    console.log(res.data)
                    if (res.data != null) {
                        console.log("&&&")
                        console.log(res.data)
                        this.setState({
                            loading: false
                        });
                        alert('Registered Successfully');
                    } else {

                        alert('Error Occurred');
                        this.setState({
                            loading: false
                        });
                    }

                }).catch((error) => {
                    alert('Error');
                    this.setState({
                        loading: false
                    });
                }).finally(() => {

                });
        }



    }





    render() {
        return (
            <div>
                <div class="topic">
                    <p class="topicp">New User  Registion Form</p>
                </div>


                <div class="form-group">
                    <label for="exampleInputUsername1">Username</label>
                    <input type="text" class="form-control" id="validationCustom01" placeholder="First name" onChange={this.handleUsernameChange} required />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailChange} required />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePasswordChange} required />
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword2">ReEnter Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Re-Password" onChange={this.handleRePasswordChange} required />
                </div>

                <div class="submitRegister">
                    <button onClick={this.handleRegisterSubmit} class="btn btn-primary">Register</button>

                    {this.state.loading ? (
                        <div class="itemLoading">
                            <img src="https://www.bmimages.com/images/WaitCover.gif"
                                alt="Loading..." height="20" width="20" />
                        </div>
                    ) : null}

                </div>


            </div>
        )
    }
}
