import React from 'react';
//import { connect } from 'react-redux';
import Login from "./../../login";
//import { LOCAL } from "../../../services/Urls";
import Header from "../../../components/Header/index";
// import ApiKeys from "../../apiKeys";
// import _404 from "../../../components/_404";
import { Route  } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';



class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            navOpen: true
        };
    }

    handleSideNavToggle (open) {
        this.setState({
            navOpen: open
        });
    }

    render () {
        return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/admin" component={Header} />
        </Switch>
        </BrowserRouter>);
    }
}


export default (App);
