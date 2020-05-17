import React, { Component } from 'react'

import firebase from '../firebase'
import axios from 'axios';

import { Link } from 'react-router-dom';


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
            fileM: null,
            file1: null,
            file2: null,
            file3: null,
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
            fileM: files[0]
        })
    }

    handleImg1Change = (files) => {
        this.setState({
            file1: files[0]
        })
    }

    handleImg2Change = (files) => {
        this.setState({
            file2: files[0]
        })
    }
    handleImg3Change = (files) => {
        this.setState({
            file3: files[0]
        })
    }




    handleImgMainSave = () => {
        let bucketName = 'items'
        let file = this.state.fileM
        if (!file) {
            alert("Please Select An Image");
        } else {
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
            const _this = this;
            storageRef.put(file).then(function (snapshot) {
                storageRef.getDownloadURL().then(function (result) {
                    console.log(_this.state.fileM)
                    _this.setState({
                        imageURL_main: result
                    })
                    console.log("*");
                    console.log(_this.state.imageURL_main);
                });

            }
            );

        }

    }


    handleImg1Save = () => {
        let bucketName = 'items'
        let file = this.state.file1
        if (!file) {
            alert("Please Select An Image");
        } else {
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
            const _this = this;
            storageRef.put(file).then(function (snapshot) {
                storageRef.getDownloadURL().then(function (result) {
                    console.log(_this.state.file1)
                    _this.setState({
                        imageURL_1: result
                    })
                    console.log("*");
                    console.log(_this.state.imageURL_1);
                });

            }
            );
        }
    }

    handleImg2Save = () => {
        let bucketName = 'items'
        let file = this.state.file2
        if (!file) {
            alert("Please Select An Image");
        } else {
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
            const _this = this;
            storageRef.put(file).then(function (snapshot) {
                storageRef.getDownloadURL().then(function (result) {
                    console.log(_this.state.file2)
                    _this.setState({
                        imageURL_2: result
                    })
                    console.log("*");
                    console.log(_this.state.imageURL_2);
                });

            }
            );

        }
    }


    handleImg3Save = () => {
        let bucketName = 'items'
        let file = this.state.file3
        if (!file) {
            alert("Please Select An Image");
        } else {
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
            const _this = this;
            storageRef.put(file).then(function (snapshot) {
                storageRef.getDownloadURL().then(function (result) {
                    console.log(_this.state.file3)
                    _this.setState({
                        imageURL_3: result
                    })
                    console.log("*");
                    console.log(_this.state.imageURL_3);
                });

            }
            );

        }
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
        axios.get(`/category`)
            .then((res) => {

                console.log(res.data)
                if (res.data != null) {
                    this.setState({
                        allCategory: res.data,
                        category: res.data[0].categoryName
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

        if (this.state.imageURL_main == null || this.state.imageURL_1 == null || this.state.imageURL_2 == null || this.state.imageURL_3 == null) {
            alert('Please select add all images');
        } else {
            event.preventDefault();

            const productObject = {
                id: this.state.id,
                category: this.state.category,
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                available_quantity: this.state.available_quantity,
                discount: this.state.discount,
                imageURL_main: this.state.imageURL_main,
                imageURL_1: this.state.imageURL_1,
                imageURL_2: this.state.imageURL_2,
                imageURL_3: this.state.imageURL_3
            };
            console.log("****")
            console.log(productObject);
            axios.post(`/api/Addproducts`, productObject)
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
                imageURL_main: '',
                imageURL_1: '',
                imageURL_2: '',
                imageURL_3: ''

            })
        }






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
                            <td>
                                {this.state.imageURL_main ? (
                                    <img src="https://upload.wikimedia.org/wikipedia/en/e/e4/Green_tick.png" alt="V" height="20" width="20" />
                                ) : null}
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
                            <td>
                                {this.state.imageURL_1 ? (
                                    <img src="https://upload.wikimedia.org/wikipedia/en/e/e4/Green_tick.png" alt="V" height="20" width="20" />
                                ) : null}
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
                            <td>
                                {this.state.imageURL_2 ? (
                                    <img src="https://upload.wikimedia.org/wikipedia/en/e/e4/Green_tick.png" alt="V" height="20" width="20" />
                                ) : null}
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
                            <td>
                                {this.state.imageURL_3 ? (
                                    <img src="https://upload.wikimedia.org/wikipedia/en/e/e4/Green_tick.png" alt="V" height="20" width="20" />
                                ) : null}
                            </td>
                        </tr>
                    </table>

                    <button type="submit" className="btn btn-success">ADD THIS ITEM</button><br></br><br></br>
                </form>
            </div>

        )
    }




}
