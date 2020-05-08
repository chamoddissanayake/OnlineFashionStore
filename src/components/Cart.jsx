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


    deleteFromCart(cartItem) {
        console.log(cartItem._id);
        var cart = [];
        for (var kkk = 0; kkk < this.state.allCartItems.length; kkk++) {
            var cartItemaa = this.state.allCartItems[kkk];
            if (cartItemaa._id != cartItem._id) {
                cart.push(cartItemaa);
            }
            // localStorage.removeItem("cart");
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setCartItems();
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

                {this.state.allCartItems ? this.state.allCartItems.map(cartItem => (
                    <tr>
                        {/* <td>{cartItem}</td> */}
                        <li>{cartItem._id}</li>
                        <li>{cartItem.id}</li>
                        <li>{cartItem.category}</li>
                        <li>{cartItem.brand}</li>
                        <li>{cartItem.description}</li>
                        <li>{cartItem.name}</li>
                        <li>{cartItem.price}</li>
                        <img src={cartItem.imageURL_main} alt="Image missing" height="250" width="200" />
                        <button onClick={() => this.deleteFromCart(cartItem)} >X</button>
                        <br></br>
                    </tr>
                )) : null}




            </div>
        )
    }
}
