import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
//import LoginRoute from  './LoginRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import BookView from "./view/BookView";
import CartView from "./view/CartView";
import OrderView from "./view/OrderView";
import {history} from "./utils/history";
class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={LoginView} />
                    <PrivateRoute exact path="/homeview" component={HomeView} />
                    <Route exact path="/bookDetails" component={BookView} />
                    <Route exact path="/CartView" component={CartView} />
                    <Route exact path="/OrderView" component={OrderView} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </Router>
        )
    }
}

export default BasicRoute;