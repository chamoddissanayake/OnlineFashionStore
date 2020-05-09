import React, { Component } from 'react'
import PaymentMethod from './paymentMethod';
import commentBoxStyles from '../css/cartStyles.css';
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
            tot = tot + (cartItemaa.needQuantity * cartItemaa.price);
            this.addTotPricetoStorage(tot);
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

    componentDidMount() {
        this.setCartItems();
        console.log("skjdfhskdjfhksjdhf")
        console.log(this.state.allCartItems);

        // this.addTotPricetoStorage(this.state.totprice);
    }
    addTotPricetoStorage(totprice) {
        // var totPrice = this.state.totprice;
        localStorage.setItem('totprice', JSON.stringify(totprice));

    }

    render() {
        return (
            <div>
                <Router>

                    <div>

                        {console.log(this.state.allCartItems)}

                        <h1 class="CartTitle">Cart</h1>



                    </div>
                </Router>

                <table class="largeTable">
                    <tr class="largeTable-row">
                        <td class="large-table-left">
                            {/* Large table right side -start */}
                            {this.state.allCartItems ? this.state.allCartItems.map(cartItem => (
                                <tr>
                                    {/* <li>{cartItem._id}</li> */}

                                    {/* <li>{cartItem.description}</li> */}

                                    <table className="table-row">
                                        <tr >
                                            <td>
                                                {/* Left side start  */}
                                                <img src={cartItem.imageURL_main} alt="Image missing" height="250" width="200" class="cartImage" />
                                                {/* Left side end  */}
                                            </td>
                                            <td>
                                                {/* Right side start */}

                                                <table class="smallTable">
                                                    <tr>
                                                        <td>

                                                        </td>
                                                        <td>
                                                            <button id="delbutton" type="button" id="delbutton" class="btn btn-outline-danger" onClick={() => this.deleteFromCart(cartItem)} >X</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Item ID</label>
                                                        </td>
                                                        <td>
                                                            <label>{cartItem.id}</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Item Category</label>
                                                        </td>
                                                        <td>
                                                            <label> {cartItem.category}</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Brand</label>
                                                        </td>
                                                        <td>
                                                            <label>{cartItem.brand}</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Name</label>
                                                        </td>
                                                        <td>
                                                            <label>{cartItem.name}</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Available Quantity</label>
                                                        </td>
                                                        <td>
                                                            <label>{cartItem.available_quantity}</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Item Price</label>
                                                        </td>
                                                        <td>
                                                            <label>{cartItem.price}</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Change Quantity</label>
                                                        </td>
                                                        <td>

                                                            <input id="needCount" type="number" value={cartItem.needQuantity} min="0" max={cartItem.available_quantity} class="form-control"
                                                                onChange={(e) => {
                                                                    console.log("sdfsdf" + e.target.value)
                                                                    cartItem.needQuantity = e.target.value

                                                                    this.updatecart(cartItem);

                                                                    this.setState({
                                                                    })
                                                                }}></input>

                                                        </td>
                                                    </tr>

                                                </table>

                                                {/* Right side end */}
                                            </td>
                                        </tr>

                                        <br></br>
                                    </table>



                                </tr>
                            )) : null}



                            <table>
                                <tr >
                                    <td class="totPriceLbl">
                                        <h3>Your Total Price</h3>
                                    </td>
                                    <td class="totPriceVal">
                                        <h2>{this.state.totprice}</h2>
                                    </td>
                                </tr>
                                <tr >
                                    <td class="totPriceLbl">
                                    </td>
                                    <td class="totPriceVal">
                                        {/* pay button */}
                                        <button type="button" class="btn btn-primary" onClick={this.gotoPaymentMethod}>Proceed >>></button>
                                    </td>
                                </tr>
                            </table>
                            {/* Large table right side -end */}
                        </td>
                        <td class="large-table-right">
                            {/* Large table left side -start */}
                            <img src="https://static.wixstatic.com/media/effc51_45948014481c4068af475d83b864d8b5~mv2.jpg/v1/fill/w_618,h_412,al_c,q_80,usm_0.66_1.00_0.01/effc51_45948014481c4068af475d83b864d8b5~mv2.webp"
                                class="fashionstoreImg" />

                            {/* Large table left side -end */}
                        </td>
                    </tr>
                </table>





            </div>
        )
    }
}
