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
            wishlistArr: [
                // { id: "5e96ba2c0c8f0d5534e32a44", productId: "5e8855ff909ead0d64801cb7", username: "ccc", addedDate: "04/15/2020" },
                // { id: "5e96ca8a0c8f0d5534e32a45", productId: "5e8855ff909ead0d64801cb7", username: "ccc", addedDate: "04/15/2020" }
            ],

        };

    }


    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
        console.log(this.state.loggedInUserObj);



    }

    render() {

        axios.post(`${BASE_URL}/api/wishlist`, { loggedInUserObj: this.state.loggedInUserObj })
            .then((wishlist) => {

                var index;
                for (index = 0; index < wishlist.data.length; index++) {

                    console.log(wishlist.data[index]);

                }

            }).catch((error) => {
                // console.log(error)
                console.log("Something went wrong");
            });


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
