import React from 'react';
import axios from 'axios'; 
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');

const urlPut = "https://santo-capricho-back.herokuapp.com/comandaPlatillo/editar/"
const urlGet="https://santo-capricho-back.herokuapp.com/comandaPlatillo/buscar/"
const urlPost="https://santo-capricho-back.herokuapp.com/comandaPlatillo/insertar"
const urlDelete="https://santo-capricho-back.herokuapp.com/comandaPlatillo/borrar/"

class ComandaPlatilloCRUD extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        posts:[],
        modalInsert: false,
        modalType: false,
        form:{
            comandaPlatilloId:'',
            cantidad:'',
            condimentos:'',
            comandaId:'',
            platilloId:'',
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
    axios.delete(urlDelete+cliente.comandaPlatilloId)
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
        window.location.href =" "
   }).catch(error=>{
    console.log(error.errorMsg);
   })
}


selectClient=(client)=>{
    this.setState({
        typeModal: 'update',
        form: {
            comandaPlatilloId:'',
            cantidad:'',
            condimentos:'',
            comandaId:'',
            platilloId:'',
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
                        <Button color='primary'className="btn btn-success" onClick={()=>this.newModal()}>Nuevo Comanda-Platillo</Button>
                        <br />
                        <br />
                        <Table responsive="lg">
                            <thead>
                                <tr className="table-danger">
                                    <th>ID</th>
                                    <th>Cantidad</th>
                                    <th>Condimentos</th>
                                    <th>ID comanda</th>
                                    <th>ID platillos</th>
                                    <th>        </th>
                                    <th>        </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((elemento, comandaPlatilloId)=>(
                                    <tr key={comandaPlatilloId}>
                                        <td>{elemento.comandaPlatilloId}</td>
                                        <td>{elemento.cantidad}</td>
                                        <td>{elemento.condimentos}</td>
                                        <td>{elemento.comandaId}</td>
                                        <td>{elemento.platilloId}</td>
                                     
                                        <td>
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
                                <label htmlFor='title' className='add-label'>Cantidad de platillos</label>
                                <input type="text" name='cantidad' className='form-control' required autoComplete='off' onChange={this.changeHandler} value={this.state.form.cantidad}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Condimentos Agregados</label>
                                <input type="text" name='condimentos' className='form-control' required onChange={this.changeHandler} value={this.state.form.condimentos}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>ID de la comanda</label>
                                <input type="text" name='comandaId' className='form-control' required onChange={this.changeHandler} value={this.state.form.comandaId}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>ID del platillo</label>
                                <input type="email" name='platilloId' className='form-control' required onChange={this.changeHandler} value={this.state.form.platilloId}/>
                            </div>                           
                        </form>
                      </div>
                        
                    </div> 
                    </ModalBody>
                    <ModalFooter>
                            <button type="submit" className='btn btn-primary' onClick={()=>{this.newSubmitHandler(); this.closeModal(); window.location.reload()}}>Submit</button>
                            <button type="submit" className="btn btn-danger" onClick={()=>this.closeModal()} >Cancel</button>
                    </ModalFooter>
                </Modal> 

                </>
                    );
        
    }
    
}



export default ComandaPlatilloCRUD;