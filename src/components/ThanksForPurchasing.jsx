import React, { Component } from 'react'

export default class ThanksForPurchasing extends Component {

    componentDidMount() {


        this.clearCartItems();
    }
    clearCartItems() {
        localStorage.removeItem("cart");
    }

    render() {
        return (
            <div>
                Thank for purchasing
            </div>
        )
    }
}
