import React, { Component } from 'react'
import utils from '../utils/utils';
import { getWishlist } from '../repository';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';


export default class Wishlist extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            wishlistArr: []
        };
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


        // console.log(cartItem._id);
        // var cart = [];
        // for (var kkk = 0; kkk < this.state.allCartItems.length; kkk++) {
        //     var cartItemaa = this.state.allCartItems[kkk];
        //     if (cartItemaa._id != cartItem._id) {
        //         cart.push(cartItemaa);
        //     }
        //     // localStorage.removeItem("cart");
        // }
        // localStorage.setItem('cart', JSON.stringify(cart));
        // this.setCartItems();

    }

    render() {




        return (
            <div>
                Wishlist<br />
                Hi {this.state.loggedInUserObj.username}, These are the list of objects you added to your wishlist



                {this.state.wishlistArr.map(wishlistItem => (
                    <div>
                        <li>{wishlistItem._id}</li>


                        <li>{wishlistItem.available_quantity}</li>
                        <li>{wishlistItem.brand}</li>
                        <li>{wishlistItem.category}</li>
                        <li> {wishlistItem.description}</li>
                        <li> {wishlistItem.id}</li>
                        <li>  {wishlistItem.name}</li>
                        <li> {wishlistItem.price}</li>

                        <img src={wishlistItem.imageURL_main} alt="Image missing" height="250" width="200" />
                        <button type="button" class="btn btn-outline-danger" onClick={() => this.deleteFromWishlist(wishlistItem)} >X</button>

                        <input id="needCount" type="number" value="1" min="0" max={wishlistItem.available_quantity}
                            onChange={(e) => {
                                // console.log("sdfsdf" + e.target.value)
                                // cartItem.needQuantity = e.target.value

                                // this.updatecart(cartItem);

                                // this.setState({
                                // })
                            }}></input>


                        <hr />
                    </div>

                ))
                }

            </div>

        )
    }
}
