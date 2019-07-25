import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import App from '../containers/app'

const Router = ({ component: Component, children, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <Component {...props} ><Switch>{children}</Switch></Component>
        )}
    />
);

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Router path="/" component={App} >
            </Router>
        </Switch>
    </BrowserRouter>
);

export default hot(module)(Root);
