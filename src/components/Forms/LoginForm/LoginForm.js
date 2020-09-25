import React, { Component } from 'react';
import axios from 'axios';
import autoBind from 'auto-bind';
import { withRouter } from "react-router-dom";

import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../../constants/apiConstants';
import './LoginForm.css';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            successMessage: null
        };
        autoBind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value })
    }

    handleSubmitClick(e) {
        e.preventDefault();
        const payload = {
            "email": this.state.email,
            "password": this.state.password,
        }
        axios.post(API_BASE_URL + '/login', payload)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        'successMessage': 'Login successful. Redirecting to home page..'
                    })
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.data.token);
                    this.props.showError(null)
                    setTimeout(()=>this.redirectToDashboard(), 2000);
                    return;
                }
                if (response.data.status === 204) {
                    this.props.showError("Username and password do not match");
                    return;
                }

                this.props.showError("Username does not exists");
                return;
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    this.props.showError(error.response.data.message);
                    return;
                } 
                
                this.props.showError('Some error ocurred');
                return;
            });
    }

    redirectToDashboard() {
        this.props.updateTitle('Dashboard');
        this.props.history.push('/dashboard');
    }

    redirectToRegister() {
        this.props.history.push('/register'); 
        this.props.updateTitle('Register');
    }

    render() {
        return (
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-check">
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmitClick}
                    >Submit</button>
                </form>
                <div className="alert alert-success mt-2" style={{ display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                    {this.state.successMessage}
                </div>
                <div className="registerMessage">
                    <span>Dont have an account? </span>
                    <span className="loginText" onClick={this.redirectToRegister}>Register</span>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginForm);