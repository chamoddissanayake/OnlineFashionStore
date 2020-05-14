import React, { Component } from 'react'


import axios from 'axios';

import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

export default class StoreManagerDashbord extends Component {

    render() {
        return (
            <div >
                <center>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZXwCx8bxTtm2LXkzAjX-6hhmMHAw2w38O-sjOXeY3Y0ngzhFO&usqp=CAU" ></img>
                <br></br><br></br><br></br><br></br><br></br><br></br>

                <img src="https://lh3.googleusercontent.com/proxy/GvOhCQOo00tj6SQnZ9hT00BrdiBhK6VRiDGfag-OKiVKQ_Wr-uJ_YkelW8fWCJ4Aex4Wy4k0KXlC3wa9zOlecfdRjEgmiP53Ld3_EaVI9sdz" height="100" width="120"></img>
              
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTl_nI8QXoOxGLACnp8dM4Ny5_COFRMVtU5Z1ctipQFjnr4Y1Oe&usqp=CAU" height="100" width="120"></img>
                
                <br></br><br></br>
                
                <Link to="/add">

                    <button className="btn btn-danger ">ADD NEW ITEMS</button>

                </Link>
                
                <Link to="/viewItems">

                    <button className="btn btn-primary">VIEW ALL ITEMS</button>


                </Link>
                
                </center>
            </div>
        )
    }
}