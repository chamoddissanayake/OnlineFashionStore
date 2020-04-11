import React, { Component } from 'react'

import { postSelectedProduct } from '../repository';

export default class selectItem extends Component {


    constructor(props) {

        super(props);

        this.state = {
            currentID: this.props.match.params.id,
            product: []

        }

    }
    componentDidMount() {

        postSelectedProduct(this.state.currentID).then((product) => this.setState({ product }));

    }



    render() {

        const { product } = this.state;

        return (
            <div>
                SelectItem
                {this.props.match.params.id}


            </div>
        )
    }
}
