import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Ingressantes from './pages/Ingressantes';
import Dashboard from './pages/Dashboard';
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Ingressantes}/>
                <Route path="/dashboard" component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    );
}