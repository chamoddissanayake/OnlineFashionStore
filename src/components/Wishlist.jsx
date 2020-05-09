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
                console.log(wishlist);
                var index;
                for (index = 0; index < wishlist.data.length; index++) {

                    console.log(wishlist.data[index]);

                }
                console.log("---------");

            }).catch((error) => {
                // console.log(error)
                console.log("Something went wrong");
            });
    }

    render() {




        return (
            <div>
                Wishlist<br />
                Hi {this.state.loggedInUserObj.username}, These are the list of objects you added to your wishlist
                {console.log("***")}
                {this.state.wishlistArr}
                {console.log("####")}
            </div>

        )
    }
}
