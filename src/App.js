//Node Package Dependencies
import React, { Component } from 'react';
import autoBind from 'auto-bind';
import {
   BrowserRouter as Router,
   Switch,
   Route,
} from "react-router-dom";

//File Dependencies
import Header from './components/Header/Header';
import LoginForm from './components/Forms/LoginForm/LoginForm';
import RegistrationForm from './components/Forms/RegistrationForm/RegistrationForm';
import Dashboard from './components/Dashboard/Dashboard';
// import PrivateRoute from './utils/PrivateRoute';
import AlertComponent from './components/AlertComponent/AlertComponent';

//Css Dependencies
import './App.css';


class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: null,
         errorMessage: null
      }
      autoBind(this);
   }

   updateTitle(title) {
      this.setState({ title });
   }

   updateErrorMessage(errorMessage) {
      this.setState({ errorMessage });
   }

   render() {
      return (
         <Router>
            <div className="App">
               <Header
                  title={this.state.title}
                  updateTitle={this.updateTitle}
               />
               <div className="container d-flex align-items-center flex-column">
                  <Switch>
                     <Route path="/" exact={true}>
                        <LoginForm
                           showError={this.updateErrorMessage}
                           updateTitle={this.updateTitle}
                        />
                     </Route>
                     <Route path="/register">
                        <RegistrationForm
                           showError={this.updateErrorMessage}
                           updateTitle={this.updateTitle}
                        />
                     </Route>
                     <Route path="/login">
                        <LoginForm
                           showError={this.updateErrorMessage}
                           updateTitle={this.updateTitle}
                        />
                     </Route>
                     <Route path="/dashboard">
                        <Dashboard
                           showError={this.updateErrorMessage}
                           updateTitle={this.updateTitle}
                        />
                     </Route>
                  </Switch>
                  <AlertComponent
                     errorMessage={this.state.errorMessage}
                     hideError={this.updateErrorMessage}
                  />
               </div>
            </div>
         </Router>
      );
   }
}


export default App;