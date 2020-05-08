import React, { Component } from 'react'
import PaymentMethod from './paymentMethod';
// import { Router } from 'express';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


export default class Cart extends Component {


    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            allCartItems: []
        };

    }

    setCartItems() {
        this.setState({
            allCartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
        })
    }

    gotoPaymentMethod = (event) => {

        window.location.href = '/paymentMethod';
    };

    componentDidMount() {
        this.setCartItems();
        console.log(this.state.allCartItems);
    }

    render() {
        return (
            <div>
                <Router>

                    <div>

                        {console.log(this.state.allCartItems)}
                                Cart

                                <button onClick={this.gotoPaymentMethod}>Proceed >>></button>

                    </div>
                </Router>
            </div>
        )
    }
}
