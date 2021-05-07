import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Users from '../pages/Users';
import Home from '../pages/Home';
import App from '../App';
import SignUp from '../pages/SignUp'

export default class extends Component{
    render(){
        return(
            <BrowserRouter>
            <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            {/* <SingIn/> */}
            <Route path="/users">
                <Users/>
            </Route>
            <Route path="/signup">
                <SignUp/>
            </Route>
            <Route path="/doc">
                <App/>
            </Route>
            </Switch>
            </BrowserRouter>
        )
    }
}