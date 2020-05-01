import React, { Component } from 'react'
import PaymentMethod from './paymentMethod';
// import { Router } from 'express';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


export default class Cart extends Component {
    render() {
        return (
            <Router>
            <div>
                Cart
                
                <Link className="navbar-brand" to="/paymentMethod">
                <button>Proceed >>></button>
                </Link>

                <div className="container">
                <Route exact path="/paymentMethod" component={PaymentMethod} />
                </div>

            </div>





            </Router>

        )
    }
}
