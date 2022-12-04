import React from 'react';
import axios, { toFormData } from 'axios'; 
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');

const urlPut = "https://santo-capricho-back.herokuapp.com/cliente/editar/"
const urlGet="https://santo-capricho-back.herokuapp.com/cliente/buscar/"
const urlPost="https://santo-capricho-back.herokuapp.com/cliente/insertar"
const urlDelete="https://santo-capricho-back.herokuapp.com/cliente/borrar/"


class addCliente extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        posts:[],
        modalInsert: false,
        modalType: false,
        form:{
            clienteId:'',
            nombre:'',
            dirección:'',
            celular:'',
            email:'',
            comandas:[]
        }
    };
} 

componentDidMount(){
    axios.get(urlGet)
    .then(response => {
        console.log(response)
        this.setState({posts: response.data})
    })
    .catch(error => {
        console.log(error)
        this.setState({errorMsg:'Error retreiving data'})
    })
}
closeModal=()=>{
    this.setState({modalInsert : false})
}
showModal=(client)=>{
    this.setState({modalInsert : true, form:client, modalType: false})
}

newModal= () =>{
    this.setState({modalInsert : true, modalType : true})
    this.newSumbmit();
}

changeHandler = (e) =>{
 this.setState({
    form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
    }
 });  
}
deleteHandler = (cliente) => {
   var opcion = alert("Seguro que deseas borrar este registro" + cliente.clienteId)
    axios.delete(urlDelete+cliente.clienteId)
   .then(response=>{
        window.location.href =" "
   }).catch(error=>{
    console.log(error.errorMsg);
   })
}


newSubmitHandler = async e =>{
    axios.post(urlPost, this.state.form)
   .then(response=>{
        this.modalInsert();
   }).catch(error=>{
    console.log(error.errorMsg);
   })
}

submitHandler = async e =>{
    axios.put(urlPut+this.state.form.clienteId, this.state.form)
   .then(response=>{
        this.modalInsert();
        window.location.href =" "
   }).catch(error=>{
    console.log(error.errorMsg);
   })
}

submitMood =()=>{
    if(this.state.modalType){
        this.newSubmitHandler({...this.state.form, modalType: true});
    }
    this.submitHandler({data:{...this.state.form}, modalType: false});
}

selectClient=(client)=>{
    this.setState({
        typeModal: 'update',
        form: {
            clienteId:'',
            nombre:'',
            dirección:'',
            celular:'',
            email:'',
            comandas:[]
        }
    })
}

onChangeValue(event){
    console.log(event.target.value);
}

    render() {
        const {posts} = this.state
            return(
                <>
                    <Container>
                        <br />
                        <Button color='primary' className="btn btn-success" onClick={()=>this.newModal()}>Nuevo Cliente</Button>
                        <br />
                        <br />
                        <Table responsive="lg">
                            <thead>
                                <tr className="table-danger">
                                    <th scope="row">ID</th>
                                    <th scope="row">Nombre Completo</th>
                                    <th scope="row">Dirección</th>
                                    <th scope="row">Celular</th>
                                    <th scope="row">Email</th>
                                    <th scope="row">comandas</th>
                                    <th>        </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((elemento, clienteId)=>(
                                    <tr key={clienteId}>
                                        <td>{elemento.clienteId}</td>
                                        <td>{elemento.nombre}</td>
                                        <td>{elemento.dirección}</td>
                                        <td>{elemento.celular}</td>
                                        <td>{elemento.email}</td>
                                        <td>{elemento.Comandas}</td>
                                        <td>
                                            <Button color='primary' className="btn btn-info" onClick={()=>this.showModal(elemento)}>Editar</Button>
                                            <Button color='primary' className="btn btn-danger" onClick={()=> this.deleteHandler(elemento)}>Eliminar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>

                    <Modal isOpen={this.state.modalInsert}>       
                    <ModalHeader style={{display:'block'}}>
                            <span style={{float: 'right'}}>x</span>
                    </ModalHeader>
                    <ModalBody>
                     <div> 
                        <h1 className="text-center">CLIENTE</h1>
                        
                        <div className='format'>
                        <form onSubmit={this.submitHandler}>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Nombre Completo</label>
                                <input type="text" name='nombre' required="true" className='form-control'  autoComplete='off' onChange={this.changeHandler} value={this.state.form.nombre}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Dirección</label>
                                <input type="text" name='dirección' className='form-control' required onChange={this.changeHandler} value={this.state.form.direccion}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Celular</label>
                                <input type="text" name='celular' className='form-control' required onChange={this.changeHandler} value={this.state.form.celular}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Email</label>
                                <input type="email" name='email' className='form-control' required onChange={this.changeHandler} value={this.state.form.email}/>
                            </div>                           
                        </form>
                      </div>
                        
                    </div> 
                    </ModalBody>
                    <ModalFooter>
                            <button type="submit" className='btn btn-primary' onClick={()=>{this.submitMood(); this.closeModal(); window.location.reload()}}>Submit</button>
                            <button type="submit" className='btn btn-primary' onClick={()=>this.closeModal()}>Cancel</button>
                    </ModalFooter>
                </Modal> 

                </>
                    );
        
    }
    
}



export default addCliente;
