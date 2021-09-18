
import React, { createContext, useEffect, useState } from 'react';

import { Alert } from 'reactstrap';

import api from "../api/index"

import history from '../services/history'

const Context = createContext();

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getLogin = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                setAuthenticated(true)
            }

            setLoading(false)
        }

        getLogin();
    }, []);

    if(loading){
        return <Alert color="primary">Carregando...</Alert>
    }

    function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem('token')

        api.defaults.headers.Authorization = undefined;

        return history.push('/login')
    }

    return (
        <Context.Provider value={{ authenticated, handleLogout,  }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider };