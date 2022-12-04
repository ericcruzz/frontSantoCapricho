import React from 'react';
import axios from 'axios'; 
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');
const fecha = new Date();

const urlPut = "https://santo-capricho-back.herokuapp.com/comanda/editar/"
const urlGet="https://santo-capricho-back.herokuapp.com/comanda/buscar/"
const urlPost="https://santo-capricho-back.herokuapp.com/comanda/insertar"
const urlDelete="https://santo-capricho-back.herokuapp.com/comanda/borrar/"

class ComandaCRUD extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        posts:[],
        modalInsert: false,
        modalType: false,
        form:{
            comandaId:'',
            noMesa:'',
            clienteId:'',
            tipoServicio:'',
            Tickets:[],
            ComandaPlatillos:[]
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
   var opcion = alert("Seguro que deseas borrar este registro" + cliente.comandaId)
    axios.delete(urlDelete+cliente.comandaId)
   .then(response=>{
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

newSubmitHandler = async e =>{
    axios.post(urlPost, this.state.form)
   .then(response=>{
        this.modalInsert();
        window.location.href =" "
   }).catch(error=>{
    console.log(error.errorMsg);
   })
}

submitHandler = async e =>{
    axios.put(urlPut+this.state.form.comandaId, this.state.form)
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
            comandaId:'',
            noMesa:'',
            clienteId:'',
            tipoServicio:'',
            Tickets:[],
            ComandaPlatillos:[]
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
                        <Button className="btn btn-success" color='primary' onClick={()=>this.newModal()}>Nuevo Comanda</Button>
                        <br />
                        <br/>
                        <Table responsive="lg">
                            <thead>
                                <tr className="table-danger">
                                    <th>ID</th>
                                    <th>Mesa (No.) </th>
                                    <th>Cliente</th>
                                    <th>Tipo de Servicio</th>
                                    <th>Fecha de comanda</th>
                                    <th>Tickets</th>
                                    <th>Comandas</th>
                                    <th>        </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((elemento, comandaId)=>(
                                    <tr key={comandaId}>
                                        <td>{elemento.comandaId}</td>
                                        <td>{elemento.noMesa}</td>
                                        <td>{elemento.clienteId}</td>
                                        <td>{elemento.tipoServicio}</td>
                                        <td>{elemento.fecha}</td>
                                        <td>{elemento.Tickets}</td>
                                        <td>{elemento.ComandaPlatillos}</td>
                                        <td>
                                            <Button color='primary' className="btn btn-danger" onClick={()=> this.deleteHandler(elemento)}>Eliminar</Button>
                                            <Button color='primary' className="btn btn-info" onClick={()=>this.showModal(elemento)}>Editar</Button>
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
                        <h1 className="text-center">COMANDA</h1>
                        
                        <div className='format'>
                        <form onSubmit={this.submitHandler}>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Mesa (No.)</label>
                                <input type="number" name='noMesa' className='form-control' required autoComplete='off' onChange={this.changeHandler} value={this.state.form.noMesa}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>clienteId</label>
                                <input type="number" name='clienteId' className='form-control' required onChange={this.changeHandler} value={this.state.form.clienteId}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Tipo de Servicio</label>
                                <select className="form-select" name='tipoServicio' required onChange={this.changeHandler} value={this.state.form.tipoServicio}>
                                    <option>A domicilio (Para llevar)</option>
                                    <option>En sucursal (comer en establecimiento)</option>
                                    <option>A domicilio y en sucursal (Estipulado en ticket)</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Fecha de Comanda</label>
                                <input type="date" name='fecha' disabled="true" className='form-control' required onChange={this.changeHandler} value={this.state.form.fecha}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Tickets</label>
                                <input type="text" name='Tickets' className='form-control' required onChange={this.changeHandler} value={this.state.form.Tickets}/>
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



export default ComandaCRUD;