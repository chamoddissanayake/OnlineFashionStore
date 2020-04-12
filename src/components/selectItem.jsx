import React, { Component } from 'react'
import axios from 'axios';
import { postSelectedProduct } from '../repository';

const BASE_URL = 'http://localhost:5000';

export default class selectItem extends Component {

    constructor(props) {

        super(props);

        this.state = {
            currentID: this.props.match.params.id,
            selectedProduct: {}

        }

    }
    componentDidMount() {

        postSelectedProduct(this.state.currentID)
            .then((product) => {
                // this.setState(product);
                // this.setState(this.state.selectedProduct.push(product));
                this.setState(this.state.selectedProduct = product);
            }).catch((error) => {
                console.log(error);
            });

        // axios.post(`${BASE_URL}/api/selectitem`, { id: this.state.currentID })
        //     .then(response => response.data);
    }



    render() {

        const { selectedProduct } = this.state;

        return (
            <div>
                SelectItem
                {this.props.match.params.id}
                {console.log(selectedProduct)}
                {selectedProduct._id}
                {selectedProduct.id}
                {selectedProduct.category}
                {selectedProduct.brand}
                {selectedProduct.name}
                {selectedProduct.description}
                {selectedProduct.price}
                {selectedProduct.available_quantity}
                {selectedProduct.imageURL_main}
                {selectedProduct.imageURL_1}
                {selectedProduct.imageURL_2}
                {selectedProduct.imageURL_3}

            </div>
        )
    }
}
