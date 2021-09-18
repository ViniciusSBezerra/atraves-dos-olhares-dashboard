import React, { useState } from "react"
import { Alert, Button, Container, Form, Input } from "reactstrap"
import api from '../../api/index'

export default function UploadStreetwear() {

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    })

    const formData = new FormData();

    const onChangeInput = (e) =>{
        formData.append('image', e.target.files[0])
    }

    const upload = e =>{
        api.post('upload', formData).then((response)=>{
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
            <h1 className="display-4">PUBLICAR FOTO STREETWEAR</h1>

            {response.type === "error" ? <Alert color="danger" >{response.message}</Alert> : ""}
            {response.type === "success" ? <Alert color="success" >{response.message}</Alert> : ""}

            <Form>
                <Input type="file" name="image" onChange={onChangeInput}></Input>

                <Button outline onClick={upload}> Publicar streetwear</Button>
            </Form>
        </Container>
    )
}


// class Upload extends Component {
//   state = {
//     selectedFile: null
//   }

//   fileSelectedHandler = e => {
//     this.setState({
//       selectedFile: e.target.files[0]
//     })
//   }

//   fileUploadHandler  = e  =>{
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', this.state.selectedFile, this.state.selectedFile.name)
//     api.post('upload', formData).then((response) =>{
//       console.log(response)
//     })
//   }

//   render() {
//     return (
//       <Form>
//         <FormGroup>
//           <Input type="file" name="image" onChange ={this.fileSelectedHandler}></Input>
//           <Button onClick={this.fileUploadHandler}>Publicar streetwear</Button>
//         </FormGroup>
//       </Form>


//     )
//   }
// }

// export default Upload;
