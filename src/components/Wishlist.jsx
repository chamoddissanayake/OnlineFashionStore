import React, { Component } from 'react'
import utils from '../utils/utils';

export default class Wishlist extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {}
        };

    }


    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());

        console.log(this.state.loggedInUserObj);
    }

    render() {

        return (
            <div>
                Wishlist<br />
                Hi {this.state.loggedInUserObj.username}, These are the list of objects you added to your wishlist
            </div>
        )
    }
}
