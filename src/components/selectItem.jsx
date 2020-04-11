import React, { Component } from 'react'
import axios from 'axios';
import { postSelectedProduct } from '../repository';

const BASE_URL = 'http://localhost:5000';

export default class selectItem extends Component {

    constructor(props) {

        super(props);

        this.state = {
            currentID: this.props.match.params.id,
            product: []

        }

    }
    componentDidMount() {

        postSelectedProduct(this.state.currentID)
            .then((product) => {
                this.setState(product);
            }).catch((error) => {
                console.log(error);
            });

        // axios.post(`${BASE_URL}/api/selectitem`, { id: this.state.currentID })
        //     .then(response => response.data);
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
