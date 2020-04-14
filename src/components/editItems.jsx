import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const BASE_URL = 'http://localhost:5000';


export default class editItems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      category: '',
      name: '',
      description: '',
      price: '',
      available_quantity: '',
      discount: '',
      image: ''
    };
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleAvailableQuantityChange = this.handleAvailableQuantityChange.bind(this);
    this.handleDiscountChange = this.handleDiscountChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('${BASE_URL}/api/products/editItems/'+this.props.match.params.id)
        .then(response => {
            this.setState({ 
              id: response.data.id, 
              category: response.data.category,
              name: response.data.name,
              description: response.data.description,
              price: response.data.price,
              available_quantity: response.data.available_quantity,
              discount: response.data.discount,
              image: response.data.image,
             });
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  handleIdChange(event) {

    this.setState({
      id: event.target.value
    }, () => {
      // console.log("Entered ID: ", this.state.id);
    });
  }

  handleCategoryChange(event) {

    this.setState({
        category: event.target.value
    }, () => {
        // console.log("Entered Category: ", this.state.id);
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

  handleDiscountChange(event) {
    this.setState({
        discount: event.target.value
    }, () => {
        // console.log("Entered discount: ", this.state.discount);
    });
  }

  handleImageChange(event) {
    this.setState({
        image: event.target.value
    }, () => {
        // console.log("Entered image: ", this.state.image);
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
      category: this.state.category,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      available_quantity: this.state.available_quantity,
      discount:this.state.discount,
      image:this.state.image
    };
    console.log(productObject);
    axios.post(`${BASE_URL}/api/products`, productObject)
      .then((res) => {

        console.log(res.data)
        if (res.data == true) {
          alert('Item Edited successfully');
        } else {
          alert('Error in editing');
        }

      }).catch((error) => {
        console.log(error)
      });

    this.setState({
      id: '',
      category: '',
      name: '',
      description: '',
      price: '',
      available_quantity: '',
      discount: '',
      image:''
    })
  }

  render() {

    return (

      <div>
        <h2>Edit Items</h2>

        <form onSubmit={this.handleSubmit} action="/api/products" method="POST" >
                    <div className="form-group">
                        <label>Item ID</label>
                        <input type="text" 
                        className="form-control" 
                        id="id" 
                        onChange={this.handleIdChange} />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" 
                        className="form-control" 
                        id="category" 
                        onChange={this.handleCategoryChange} />
                    </div>

                    <div className="form-group">
                        <label>Item Name</label>
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

                    <div className="form-group">
                        <label>Discount</label>
                        <input type="number" 
                        min="0" step="0" 
                        className="form-control" 
                        id="discount" 
                        onChange={this.handleDiscountChange} />
                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <input type="text" 
                        className="form-control" 
                        id="image" 
                        onChange={this.handleImageChange} />
                    </div>

                    <button type="submit" className="btn btn-success">EDIT THIS ITEM</button><br></br><br></br>
                </form>
      </div>

    );

  }
}
