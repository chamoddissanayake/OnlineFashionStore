import React, { Component } from 'react'


import axios from 'axios';

import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

export default class StoreManagerDashbord extends Component {

    render(){
        return(
            
            <div>

                    <h1>Store Manager Dashbord</h1><br></br><br></br><br></br><br></br>

                    <Link to="/add">

                     <button className="btn btn-primary">ADD NEW ITEMS</button>

                    </Link><br></br><br></br><br></br><br></br>


                    <Link to="/viewItems">

                     <button className="btn btn-primary">VIEW ALL ITEMS</button>

                    </Link>
            </div>
        )
    }
}