import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const BASE_URL = 'http://localhost:5000';
export default class addItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            price: '',
            available_quantity: ''
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAvailableQuantityChange = this.handleAvailableQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIdChange(event) {

        this.setState({
            id: event.target.value
        }, () => {
            // console.log("Entered ID: ", this.state.id);
        });


    }
    handleNameChange(event) {
        this.setState({
            name: event.target.value
        }, () => {
            // console.log("Entered Name: ", this.state.name);
        });
    }
    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        }, () => {
            // console.log("Entered Description: ", this.state.description);
        });
    }
    handlePriceChange(event) {
        this.setState({
            price: event.target.value
        }, () => {
            // console.log("Entered Description: ", this.state.price);
        });
    }
    handleAvailableQuantityChange(event) {
        this.setState({
            available_quantity: event.target.value
        }, () => {
            // console.log("Entered Available Quantity: ", this.state.available_quantity);
        });
    }



    handleSubmit(event) {
        // alert('Item was sumbitted' +
        //     this.state.id +
        //     this.state.name +
        //     this.state.description +
        //     this.state.price +
        //     this.state.available_quantity
        // );
        event.preventDefault();

        const productObject = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            available_quantity: this.state.available_quantity
        };
        console.log(productObject);
        axios.post(`${BASE_URL}/api/products`, productObject)
            .then((res) => {

                console.log(res.data)
                if (res.data == true) {
                    alert('Added to DB successfully');
                } else {
                    alert('Error While adding to DB');
                }

            }).catch((error) => {
                console.log(error)
            });

        this.setState({
            id: '',
            name: '',
            description: '',
            price: '',
            available_quantity: ''
        })
    }

    render() {
        return (
            <div>
                <h2>Add Items</h2>

                <form onSubmit={this.handleSubmit} action="/api/products" method="POST" >
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" 
                        className="form-control" 
                        id="id" 
                        onChange={this.handleIdChange} />
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" 
                        className="form-control" 
                        id="name" 
                        onChange={this.handleNameChange} />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" 
                        className="form-control" 
                        id="description" 
                        onChange={this.handleDescriptionChange} />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" 
                        min="0" 
                        step="0.00" 
                        className="form-control" 
                        id="price" onChange={this.handlePriceChange} />
                    </div>
                    
                    <div className="form-group">
                        <label>Available Quantity</label>
                        <input type="number" 
                        min="0" step="0" 
                        className="form-control" 
                        id="available_quantity" 
                        onChange={this.handleAvailableQuantityChange} />
                    </div>

                    <button type="submit" className="btn btn-success">ADD THIS ITEM</button><br></br><br></br>
                </form>
            </div>
          
        )
    }




}
