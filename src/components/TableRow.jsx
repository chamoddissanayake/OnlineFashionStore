import React from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export default class TableRow extends React.Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    //alert('Are you sure to delete this item?');
    axios.delete(`${BASE_URL}/api/products/`+ this.props.obj._id )
      .then(response => {
        console.log(response);
        if (response.data == true) {
          alert('Item Deleted Successfully');
        } else {
          alert('Error in Deleting');
        }

      });
    window.location.href = '/viewItems'

  }
  render() {

    return (
      
      <tr >
        <td>
          {this.props.obj._id}
        </td>
        <td >
          {this.props.obj.category}
        </td>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.description}
        </td>
        <td>
          {this.props.obj.price}
        </td>
        <td>
          {this.props.obj.available_quantity}
        </td>
        <td>
          {this.props.obj.discount}
        </td>
        <td>
          {this.props.obj.image}
        </td>
        <td>
          <Link to={"/editItems/" + this.props.obj._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <Link to="/viewItems">
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </Link>

        </td>
      </tr>
    )

  }


};