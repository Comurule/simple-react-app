import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";


import './RegistrationForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../../constants/apiConstants';
import autoBind from 'auto-bind';



class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            successMessage: null
        };
        autoBind(this);
    }
    handleChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value })
    }

    sendDetailsToServer() {
        if (this.state.email.length && this.state.password.length) {
            this.props.showError(null);
            const payload = {
                "email": this.state.email,
                "password": this.state.password,
            }
            axios.post(API_BASE_URL + '/register', payload)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        })
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        setTimeout(()=>this.redirectToDashboard(), 2000);
                        this.props.showError(null);
                        return;
                    }
                    this.props.showError("Some error ocurred");
                    return;
                })
                .catch(error => {
                    console.log(error);
                    if (error.response) {
                        this.props.showError(error.response.data.message);
                        return;
                    } 
                });
        } else {
            this.props.showError('Please enter valid username and password');
        }

    };

    redirectToDashboard() {
        this.props.updateTitle('Dashboard')
        this.props.history.push('/dashboard');
    }

    redirectToLogin() {
        this.props.updateTitle('Login')
        this.props.history.push('/login');
    };

    handleSubmitClick(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            this.sendDetailsToServer()
        } else {
            this.props.showError('Passwords do not match');
        }
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
                        <small
                            id="emailHelp"
                            className="form-text text-muted"
                        >
                            We'll never share your email with anyone else.
                            </small>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmitClick}
                    >
                        Register
                    </button>
                </form>
                <div
                    className="alert alert-success mt-2"
                    style={{ display: this.state.successMessage ? 'block' : 'none' }}
                    role="alert"
                >
                    {this.state.successMessage}
                </div>
                <div className="mt-2">
                    <span>Already have an account? </span>
                    <span className="loginText" onClick={this.redirectToLogin}>Login here</span>
                </div>

            </div>
        )
    }

}

export default withRouter(RegistrationForm);