import React, { Component } from 'react';
import autoBind from 'auto-bind';


import './AlertComponent.css';

class AlertComponent extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    closeModal() {
        this.props.hideError(null);
    }

    render() {
        return (
            <div
                className={"alert alert-danger alert-dismissable mt-4"}
                role="alert"
                id="alertPopUp"
                style={{ display: this.props.errorMessage ? 'block' : 'none' }}
            >
                <div className="d-flex alertMessage">
                    <span>{this.props.errorMessage}</span>
                    <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

            </div>
        )
    }


}

export default AlertComponent