
import React, { useState } from "react"

import { Alert, Button, Container, Form, Input } from "reactstrap"

import api from "../../api"

export default function UploadEnsaio() {

    const [response, setResponse] = useState({})

    const formData = new FormData();

    const onChangeInput = (e) =>{
        formData.append('ensaio', e.target.files[0])
    }

    const upload = e =>{
        api.post('upload-ensaio', formData).then((response)=>{
           setResponse(response.data)

           if(response.data.error){
               setResponse({
                   type: 'error',
                   message: response.data.message
               })
           }else{
            setResponse({
                type: 'success',
                message: response.data.message
            })
           }
        }).catch(()=>{
            setResponse({
                type: 'error',
                message: "Não foi possivel realizar o Upload, SERVIDOR OFF "
            })
        })
    }

    return (

        <Container>
            <h1 className="display-4">PUBLICAR FOTOS DE ENSAIOS</h1>
            {response.type === "error" ? <Alert color="danger" >{response.message}</Alert> : ""}
            {response.type === "success" ? <Alert color="success" >{response.message}</Alert> : ""}


            <Form>
                <Input type="file" name="ensaio" onChange={onChangeInput}></Input>

                <Button outline onClick={upload}>Publicar</Button>
            </Form>
        </Container>
    )
}