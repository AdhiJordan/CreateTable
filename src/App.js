import React, {Component} from 'react';
import { Route  } from 'react-router';
import { BrowserRouter, Switch, HashRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import Settings from './pages/Settings';
import Login from './pages/Login';



export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    
                    <Route exact path="/" component={Login} />
                    <Route exact path="/admin" component={Dashboard} />
                    <Route exact path="/admin/dashboard" component={Dashboard} />
                    <Route exact path="/admin/administrators" component={Dashboard} />
                    <Route exact path="/admin/settings" component={Dashboard} />

                </Switch>
            </BrowserRouter>
        );
    }
}
