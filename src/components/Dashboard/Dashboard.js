import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import autoBind from 'auto-bind';
import axios from 'axios';


import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            userDetails: {}
        }
        autoBind(this);
    }

    getUserDetails() {
        axios.get(API_BASE_URL + '/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 200) {
                this.redirectToLogin();
                return;
            }
            setTimeout(() => { this.setState({ userDetails: response.data.data }) }, 100);

        }).catch(error => {
            console.log(error);
            this.redirectToLogin();
        });
    }

    redirectToLogin() {
        this.props.updateTitle('Login');
        this.props.history.push('/login');
    }
    componentDidMount() {
        this.getUserDetails();
    }

    // componentWillUnmount() {
    //     clearTimeout(this);
    // }
    render() {
        return (
            <div className="mt-2">
                Hello, {this.state.userDetails.email}
            </div>
        )
    }

}

export default withRouter(Dashboard);