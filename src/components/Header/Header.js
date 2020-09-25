import React, { Component } from 'react';
import autoBind from 'auto-bind';
import { withRouter } from "react-router-dom";

import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title
        };
        autoBind(this);
    }

    capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    title() {
        console.log('here');
        if (this.props.location.pathname === '/') {
            this.setState({title: 'Welcome'})
            return;
        }
        this.setState(state=>{
            state.title = this.capitalize(this.props.location.pathname.substring(1, this.props.location.pathname.length));
        })
        // title = this.capitalize(this.props.location.pathname.substring(1, this.props.location.pathname.length));
        return;
    }

    renderLogout() {
        if (this.props.location.pathname === '/dashboard') {
            return (
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
                </div>
            )
        }
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        this.props.updateTitle('Login');
        this.props.history.push('/login');
    }

    render() {
        if (this.props.location.pathname === '/dashboard') {
            return (
                <nav className="navbar navbar-dark bg-primary">
                    <div className="row col-12 d-flex justify-content-center text-white">
                        <span className="h3">{this.props.title || 'Welcome'}</span>
                        <div className="ml-auto">
                            <button className="btn btn-danger" onClick={this.handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            )
        }
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="row col-12 d-flex justify-content-center text-white">
                    <span className="h3">{this.props.title || 'Welcome'}</span>
                </div>
            </nav>
        )
    }

}

export default withRouter(Header);