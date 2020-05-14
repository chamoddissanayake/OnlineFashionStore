import React, { Component } from 'react'

import firebase from '../firebase'
import axios from 'axios';

import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

export default class addItem extends Component {

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
            imageURL_main: '',
            allCategory : [],
            display : true,
            file:null
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

    handleChange=(files)=>{
        this.setState({
          files:files
        })
      }
      
      handleSave=()=>{
        let bucketName = 'images'
        let file =this.state.files[0]
        let storageRef=firebase.storage().ref(`${bucketName}/${file.name}`)
        let uploadTask = storageRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            let downloadURL = uploadTask.snapshot.downloadURL
          })
      }
      /*showImage=()=>{
        let storageRef = firebase.storage().ref()
        let spaceRef = storageRef.child('images/'+this.state.files[0].name)
        storageRef.child('images/'+this.state.files[0].name).getDownloadURL().then((url)=>{
          console.log(url)
          document.getElementById('new-img').src= url
        })
      }*/

    componentDidMount() {
        axios.get(`${BASE_URL}/category`)
            .then((res) => {

                console.log(res.data)
                if (res.data != null) {
                    this.setState({
                        allCategory : res.data

                    });
                    console.log(this.state.allCategory[0].categoryName);


                } else {
                    alert('Error');
                }

            }).catch((error) => {
            console.log(error)
            }).finally(()=> {
                this.setState({
                    display : false

                });
            }) ;
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
            imageURL_main: event.target.value
        }, () => {
            // console.log("Entered image: ", this.state.image);
        });
    }


    handleSubmit(event) {

        event.preventDefault();

        const productObject = {
            id: this.state.id,
            category: this.state.category,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            available_quantity: this.state.available_quantity,
            discount: this.state.discount,
            imageURL_main: this.state.imageURL_main
        };
        console.log(productObject);
        axios.post(`${BASE_URL}/api/Addproducts`, productObject)
            .then((res) => {

                console.log(res.data)
                if (res.data == true) {
                    alert('Item ' + document.getElementById("name").value + ' Saved Successfuly.');
                    window.location.href = '/add'
                } else {
                    alert('Error in saving');
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
            imageURL_main: ''
        })
    }

    render() {
        return (
            <div>
                <h2>Add Items</h2><br></br>

                <form onSubmit={this.handleSubmit} action="/api/products" method="POST" >

                    <div className="form-row">
                        <label className="form-group col-md-1">Category</label>
                        { this.state.display &&
                            <div className="spinner-border text-primary " id="loader" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </div>

                    <div className="form-group">


                        <select id="category" className="form-control" onChange={this.handleCategoryChange} >

                            {

                                this.state.allCategory.map((field , key) =>
                                    <option key = {field.id} value={field.categoryName}>{field.categoryName}</option>
                                )
                            }


                        </select>

                     
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
                            id="imageURL_main"
                            onChange={this.handleImageChange} />

                   
                      <input type="file" onChange={(e)=>{this.handleChange(e.target.files)}}/>
                        <button onClick={this.handleSave}>save</button>
     
                            <img id="new-img"/>
    

                    </div>

                    <button type="submit" className="btn btn-success">ADD THIS ITEM</button><br></br><br></br>
                </form>
            </div>

        )
    }




}
