import React, { Component } from 'react';
import utils from '../utils/utils';

export default class Logout extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {}
        };

    }

    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
        localStorage.removeItem("loggedInUser");

        const { location } = this.props;
        if (location.state && location.state.from) {
            this.props.history.push(location.state.from);
        } else {
            this.props.history.push('/');
        }
        window.location.reload();
    }

    render() {
        return (
            <div>
                <p>Please wait...........</p>
            </div>
        )
    }
}
