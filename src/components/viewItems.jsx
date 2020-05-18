import React, { Component } from 'react'

import axios from 'axios';

import ProductItem from './ProductItem';

import { getProducts } from '../repository';

import TableRow from './TableRow';

import { Link } from 'react-router-dom';


export default class viewItems extends Component{

  constructor(props) {
    super(props);
    this.state = {products: []};
  }
  componentDidMount(){
    axios.get(`/api/products`)
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  tabRow(){
    return this.state.products.map(function(object, i){
        return <TableRow obj={object} key={i} />;
    });
  }
      render() {
          
        return (
    
          <div className=" container">
            <center>
            <h3>All Items</h3>
            </center>
            
            <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr class="bg-primary">
                <th>Item Id</th>
                <th>Category</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Item Price</th>
                <th>Available Quantity</th>
                <th>Discount</th>
                {/* <th>Image</th> */}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                { this.tabRow() }
            </tbody>
          </table>
            
    
            <hr />
          </div>
    
        );
    
      }

}