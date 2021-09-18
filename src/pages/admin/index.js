
import React, { useContext, useEffect, useState } from 'react';

import { Alert, Button, Container, Table } from 'reactstrap';

import api from '../../api';

import { Context } from '../../context/authorizationContext';

function Dashboard() {

    const { handleLogout } = useContext(Context);

    const [ensaios, setEnsaio] = useState({});

    const [image, setImage] = useState({});

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const listImage = () => {
        api.get('list-image').then((response) => {
            setImage(response.data.response)
            console.log(response.data.response)
        })
    };

    const listEnsaio = () => {
        api.get('list-ensaios').then((response) => {
            setEnsaio(response.data.response)
            console.log(response.data.response)
        })
    };

    useEffect(() => {
        listImage()
        listEnsaio()
    }, [])

    const deleteImage = (imageId) => {
        api.delete('delete-image/' + imageId)
            .then((response) => {
                setResponse(response.data);
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
                }
            }).catch(() => {
                setResponse({
                    type: 'error',
                    message: "Não foi possivel conectar-se ao servidor"
                })
            })
    }

    const deleteEnsaio = (ensaioId) => {
        api.delete('delete-ensaio/' + ensaioId)
            .then((response) => {
                setResponse(response.data);
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
                }
            }).catch(() => {
                setResponse({
                    type: 'error',
                    message: "Não foi possivel conectar-se ao servidor"
                })
            })

    }

    return (
        <Container>

            {response.type === "error" ? <Alert color="danger" >{response.message}</Alert> : ""}
            {response.type === "success" ? <Alert color="success" >{response.message}</Alert> : ""}

            <h1>fotos streetwears</h1>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image-name</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(image) && image.map(image => (

                        <tr>
                            <th scope="row">{image.id}</th>
                            <td>{image.name}</td>
                            <td><Button onClick={() => deleteImage(image.id)} color="danger" outline> Deletar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h1>Ensaios</h1>
            <Table responsive dark>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image-name</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(ensaios) && ensaios.map(ensaios => (
                        <tr>
                            <th scope="row">{ensaios.id}</th>
                            <td>{ensaios.name}</td>
                            <td><Button onClick={() => deleteEnsaio(ensaios.id)} color="danger" outline> Deletar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button type="button" color="danger" onClick={handleLogout}>Sair</Button>
        </Container>
    )
}

export default Dashboard