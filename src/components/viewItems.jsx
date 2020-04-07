import React, { Component } from 'react'

import axios from 'axios';

import ProductItem from './ProductItem';

import { getProducts } from '../repository';

import TableRow from './TableRow';

import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

export default class viewItems extends Component{

  constructor(props) {
    super(props);
    this.state = {products: []};
  }
  componentDidMount(){
    axios.get(`${BASE_URL}/api/products`)
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
    
            <h3 className="card-title">View Items</h3><hr />
            <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Available Quantity</th>
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