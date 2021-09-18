
import React, {  useContext } from 'react';

import {
    Router,
    Switch,
    Route,
    Redirect

} from "react-router-dom";


import UploadStreetwear from './pages/upload-streetwear';

import Login from './pages/login';

import  history  from './services/history';

import { AuthProvider, Context } from './context/authorizationContext'

import Dashboard from './pages/admin';

import UploadEnsaio from './pages/upload-ensaio';


export default function Routes() {

    function CustomRoute({isPrivate, ...rest}){
        const { authenticated} = useContext(Context);

        if(isPrivate && !authenticated){
            return <Redirect to="/" />
        }

        return <Route {...rest}/>
    }
    return (
        <AuthProvider>
            <Router history={history}>
                <Switch>
                    <CustomRoute exact path="/" component={Login}></CustomRoute>

                   

                    <CustomRoute isPrivate path="/upload-ensaio" component={UploadEnsaio}></CustomRoute>

                    <CustomRoute isPrivate path="/upload-image" component={UploadStreetwear}></CustomRoute>

                    <CustomRoute isPrivate path="/dashboard" component={Dashboard}></CustomRoute>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export { Routes}