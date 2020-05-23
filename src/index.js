import React from 'react';

import ReactDOM from 'react-dom';

import App from './App';

import * as serviceWorker from './serviceWorker';
import utils from "./utils/utils";

// import 'bootstrap/dist/css/bootstrap.min.css';

var obj = {};
obj = utils.checkLoggedInUser();

if(obj == null) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
else
{
    if (obj.type == "admin") {
        window.location.href = "./Admin/index.html";
    } else {
        ReactDOM.render(<App/>, document.getElementById('root'));
    }

}



serviceWorker.unregister();