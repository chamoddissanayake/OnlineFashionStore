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
            allCategory: [],
            display: true,
            files: [],
            imageURL_1: '',
            imageURL_2: '',
            imageURL_3: ''

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
        this.handleImgMainSave = this.handleImgMainSave.bind(this);
        this.handleImg1Save = this.handleImg1Save.bind(this);
        this.handleImg2Save = this.handleImg2Save.bind(this);
        this.handleImg3Save = this.handleImg3Save.bind(this);
    }

    handleImgMainChange = (files) => {
        this.setState({
            files: files
        })
    }

    handleImg1Change = (files) => {
        this.setState({
            files: files
        })
    }

    handleImg2Change = (files) => {
        this.setState({
            files: files
        })
    }
    handleImg3Change = (files) => {
        this.setState({
            files: files
        })
    }

    handleImgMainSave = () => {
        let bucketName = 'items'
        let file = this.state.files[0]
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
        let uploadTask = storageRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);

            });
        });
    }


    handleImg1Save = () => {
        let bucketName = 'items'
        let file = this.state.files[0]
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
        let uploadTask = storageRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
            });
        });
    }

    handleImg2Save = () => {
        let bucketName = 'items'
        let file = this.state.files[0]
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
        let uploadTask = storageRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
            });
        });
    }


    handleImg3Save = () => {
        let bucketName = 'items'
        let file = this.state.files[0]
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
        let uploadTask = storageRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
            });
        });
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
                        allCategory: res.data

                    });
                    console.log(this.state.allCategory[0].categoryName);


                } else {
                    alert('Error');
                }

            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.setState({
                    display: false

                });
            });
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
                <center>

                    <h2>Add Items</h2><br></br>

                </center>

                <form onSubmit={this.handleSubmit}  >

                    <div className="form-row">
                        <label className="form-group col-md-1">Category</label>
                        {this.state.display &&
                            <div className="spinner-border text-primary " id="loader" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </div>

                    <div className="form-group">


                        <select id="category" className="form-control" onChange={this.handleCategoryChange} >

                            {

                                this.state.allCategory.map((field, key) =>
                                    <option key={field.id} value={field.categoryName}>{field.categoryName}</option>
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

                    {/* <div className="form-group">

                        <label>Image</label>
                        <input type="text"
                            className="form-control"
                            id="imageURL_main"
                            onChange={this.handleImageChange} /> */}


                    {/* <input type="file" onChange={(e) => { this.handleImgMainChange(e.target.files) }} />
                        <button onClick={this.handleImgMainSave}>save</button> */}

                    {/* <img id="new-img" /> */}
                    {/* </div> */}

                    <table>
                        <tr>
                            <td>
                                <p>Main Image :</p>
                            </td>
                            <th>
                                <input type="file" onChange={(e) => { this.handleImgMainChange(e.target.files) }} />
                            </th>
                            <td>
                                <button type="button" class="btn btn-primary" onClick={this.handleImgMainSave}>+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Image 1 :</p>
                            </td>
                            <td>
                                <input type="file" onChange={(e) => { this.handleImg1Change(e.target.files) }} />
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary" onClick={this.handleImg1Save}>+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Image 2 :</p>
                            </td>
                            <td>
                                <input type="file" onChange={(e) => { this.handleImg2Change(e.target.files) }} />
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary" onClick={this.handleImg2Save}>+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Image 3 :</p>
                            </td>
                            <td>
                                <input type="file" onChange={(e) => { this.handleImg3Change(e.target.files) }} />
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary" onClick={this.handleImg3Save}>+</button>
                            </td>
                        </tr>
                    </table>

                    <button type="submit" className="btn btn-success">ADD THIS ITEM</button><br></br><br></br>
                </form>
            </div>

        )
    }




}
