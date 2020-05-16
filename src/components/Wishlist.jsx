import React, { Component } from 'react'
import utils from '../utils/utils';
import { getWishlist } from '../repository';
import axios from 'axios';
import wishlistStyles from '../css/wishlistStyles.css';

const BASE_URL = 'http://localhost:5000';


export default class Wishlist extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            wishlistArr: [],
            message: 'You are not added any item to wishlist yet'
        };
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
        console.log("Component Did mount - start");
        console.log(this.state.loggedInUserObj);
        console.log(this.state.loggedInUserObj.username);
        console.log("Component Did mount - end");

        this.getWishlistData();

    }

    getWishlistData() {
        axios.post(`${BASE_URL}/api/wishlist`, { loggedInUserObj: this.state.loggedInUserObj })
            .then((wishlist) => {
                console.log("---------");
                console.log(wishlist.data);
                // var index;
                // for (index = 0; index < wishlist.data.length; index++) {

                //     console.log(wishlist.data[index]);

                this.setState(this.state.wishlistArr = wishlist.data);

                if (this.state.wishlistArr.length > 0) {
                    this.setState({ message: 'This is the list of items you added to the wishlist' });
                }

                // }
                console.log("---------");

            }).catch((error) => {
                // console.log(error)
                console.log("Something went wrong");
            });
    }

    deleteFromWishlist(wishlistItem) {

        console.log(wishlistItem._id);


        axios.post(`${BASE_URL}/api/wishlistDelete`, { wishlistItem: wishlistItem })
            .then(() => {
                this.getWishlistData();

            }).catch((error) => {
                console.log(error)
            });



    }

    addToCart = (wishlistItem) => {

        let cart = localStorage.getItem('cart')

            ? JSON.parse(localStorage.getItem('cart')) : [];




        if (wishlistItem.available_quantity > 0) {
            cart.push(wishlistItem);
        };
        localStorage.setItem('cart', JSON.stringify(cart));
        this.deleteFromWishlist(wishlistItem);
        alert("Item was added to your cart");

    }

    render() {




        return (
            <div>
                <h1 class="heading" >Wishlist</h1>

                <br />
                <h3 class="personalizeMessage">
                    Hi, {this.state.loggedInUserObj.username + "  "} {this.state.message}
                </h3>
                <br />


                {this.state.wishlistArr.map(wishlistItem => (
                    <div>
                        {/* <li>{wishlistItem._id}</li> */}

                        <table>



                            <tr class="table-row">
                                <td>
                                    {/* Left column start */}
                                    <img src={wishlistItem.imageURL_main} alt="Image missing" height="250" width="200" class="imgclass" />
                                    {/* Left column end */}
                                </td>
                                <td class="middle-td-large">
                                    {/* Middle column start */}
                                    <table class="middle-tbl">
                                        <tr class="middle-tbl-row">
                                            <td class="td-lbl">
                                                <label>Item ID</label>
                                            </td>
                                            <td class="td-val">
                                                <label>{wishlistItem._id}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="td-lbl">
                                                <label>Category</label>
                                            </td>
                                            <td class="td-val">
                                                <label>{wishlistItem.category}</label>
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td class="td-lbl">
                                                <label>Brand</label>
                                            </td>
                                            <td class="td-val">
                                                <label>{wishlistItem.brand}</label>
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <td class="td-lbl">
                                                <label>Name</label>
                                            </td>
                                            <td class="td-val">
                                                <label>{wishlistItem.name}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="td-lbl">
                                                <label>Description</label>
                                            </td>
                                            <td class="td-val">
                                                <label>{wishlistItem.description}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="td-lbl">
                                                <label>Available Quantity</label>
                                            </td>
                                            <td class="td-val">
                                                <label>{wishlistItem.available_quantity}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="td-lbl">
                                                <label>Price</label>
                                            </td>
                                            <td class="td-val">
                                                <label>{wishlistItem.price}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="td-lbl">
                                                <label>Need Amount</label>
                                            </td>
                                            <td class="td-val">
                                                <input id="needCount" type="number" value={wishlistItem.needQuantity ? wishlistItem.needQuantity : (wishlistItem.needQuantity = 1)} min="1" max={wishlistItem.available_quantity}
                                                    onChange={(e) => {
                                                        // console.log("sdfsdf" + e.target.value)
                                                        wishlistItem.needQuantity = e.target.value

                                                        // this.updatecart(cartItem);

                                                        this.setState({
                                                        })
                                                    }}></input>
                                            </td>
                                        </tr>
                                    </table>
                                    {/* Middle column end */}
                                </td>
                                <td class="addToCartCol">
                                    {/* Right column start */}
                                    <button className="btn btn-sm btn-warning float-right"

                                        onClick={() => { this.addToCart(wishlistItem) }}>Add to cart</button>
                                    {/* Right column end */}
                                </td>
                                <td>
                                    <button type="button" class="btn btn-outline-danger" id="deletebtn" onClick={() => this.deleteFromWishlist(wishlistItem)} >X</button>
                                </td>
                            </tr>
                        </table>











                        <hr />
                    </div>

                ))
                }

            </div>

        )
    }
}
