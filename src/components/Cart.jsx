import React, { Component } from 'react'
import PaymentMethod from './paymentMethod';
// import { Router } from 'express';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


export default class Cart extends Component {


    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            allCartItems: [],
            totprice: 0

        };

    }

    setCartItems() {
        let ggg = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        this.setState({
            allCartItems: ggg
        })
        this.calcTot(ggg);
    }

    gotoPaymentMethod = (event) => {

        window.location.href = '/paymentMethod';
    };



    calcTot(ggg) {
        if (!ggg) {
            ggg = this.state.allCartItems;
        }
        var tot = 0;
        for (var i = 0; i < ggg.length; i++) {
            var cartItemaa = ggg[i];
            tot = tot + (cartItemaa.needQuantity * cartItemaa.price)
        }

        this.setState({
            totprice: tot
        })

    }

    updatecart(cartItem) {
        var cart = [];
        for (var kkk = 0; kkk < this.state.allCartItems.length; kkk++) {
            var cartItemaa = this.state.allCartItems[kkk];
            if (cartItemaa._id == cartItem._id) {
                cartItemaa.needQuantity = cartItem.needQuantity;
                cart.push(cartItemaa);
            } else {
                cart.push(cartItemaa);
            }

        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setCartItems();

        // this.calcTot();
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

        // this.calcTot();
    }

    componentDidMount() {
        this.setCartItems();
        console.log("skjdfhskdjfhksjdhf")
        console.log(this.state.allCartItems);

        // this.calcTot();
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
                        <li>{cartItem.available_quantity}</li>

                        <img src={cartItem.imageURL_main} alt="Image missing" height="250" width="200" />

                        <input id="needCount" type="number" value={cartItem.needQuantity} min="0" max={cartItem.available_quantity}
                            onChange={(e) => {
                                console.log("sdfsdf" + e.target.value)
                                cartItem.needQuantity = e.target.value

                                this.updatecart(cartItem);

                                this.setState({
                                })
                            }}></input>

                        <button onClick={() => this.deleteFromCart(cartItem)} >X</button>
                        <br></br>
                    </tr>
                )) : null}


                {this.state.totprice}

            </div>
        )
    }
}
