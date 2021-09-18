

import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import api from '../../api/index';

import { Alert, Form, FormGroup, Input, Button,  Container } from "reactstrap";


export default function Login() {

    const history = useHistory()

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [response, setResponse] = useState({
        formSave: false,
        type: "",
        message: ""
    })

    const onChangeInput = e => setData({ ...data, [e.target.name]: e.target.value });

    const login = async e => {
        e.preventDefault();

        await api.post('login', data)
            .then((response) => {
                if (response.data.error) {
                    
                    setResponse({
                        type: 'error',
                        message: response.data.message
                    })
                } else {
                    
                    setResponse({
                        type: 'success',
                        message: response.data.message
                    })

                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

                   
                    return history.push('dashboard')
                }
            })
            .catch(() => {
                setResponse({
                    type: 'error',
                    message: "Erro: Não foi possivel se conectar ao servidor!"
                })
            })
    }

    return (
        <Container style={{height: "550px"}}>

            <h1 className="display-4">login</h1>

            {response.type === "success" ? <Alert color="success">{response.message}</Alert> : ""}
            {response.type === "error" ? <Alert color="danger">{response.message}</Alert> : ""}

            <Form onSubmit={login}>
                <FormGroup>
                    <Input type="text" name="email" placeholder="Email" onChange={onChangeInput}></Input>
                </FormGroup>

                <FormGroup>
                    <Input style={{marginTop: "20px"}} type="password" name="password"  placeholder="Password" autoComplete="on" onChange={onChangeInput}></Input>
                </FormGroup>

                <Button color="primary" outline size="lg" style={{marginTop: "20px"}} type="submit">Entrar</Button>
            </Form>
        </Container>
    )
}