import React from 'react';
import axios from 'axios'; 
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');

const urlPut = "https://santo-capricho-back.herokuapp.com/ticket/editar/"
const urlGet="https://santo-capricho-back.herokuapp.com/ticket/buscar/"
const urlPost="https://santo-capricho-back.herokuapp.com/ticket/insertar"
const urlDelete="https://santo-capricho-back.herokuapp.com/ticket/borrar/"
const fecha = new Date();
const hoy = fecha.getDate();

class TicketCRUD extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        posts:[],
        modalInsert: false,
        modalType: false,
        form:{
            ticketId:'',
            fecha:'',
            formaPago:'',
            subtotal:'',
            total:'',
            factura:'',
            fechaFactura:'',
            RFC:'',
            comandaId:''
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
    this.setState({modalInsert : true, modalType : true, form: hoy})
    this.newSumbmitHandler();
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
   var opcion = alert("Seguro que deseas borrar este registro" + cliente.ticketId)
    axios.delete(urlDelete+cliente.ticketId)
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
            ticketId:'',
            fecha: hoy,
            formaPago:'',
            subtotal:'',
            total:'',
            factura:'',
            fechaFactura:'',
            RFC:'',
            comandaId:''
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
                        <Button className="btn btn-info" color='primary' onClick={()=>this.newModal()}>Nuevo Ticket</Button>
                        <br />
                        <br />
                        <Table responsive="lg">
                            <thead>
                                <tr class="table-warning">
                                    <th>ID</th>
                                    <th>Fecha </th>
                                    <th>Forma de Pago</th>
                                    <th>Subtotal</th>
                                    <th>Total</th>
                                    <th>Factura</th>
                                    <th>Fecha de Facturación</th>
                                    <th>RFC</th>
                                    <th>ID de comanda</th>
                                    <th>        </th>
                                    <th>        </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((elemento, ticketId)=>(
                                    <tr key={ticketId}>
                                        <td>{elemento.ticketId}</td>
                                        <td>{elemento.fecha}</td>
                                        <td>{elemento.formaPago}</td>
                                        <td>{elemento.subtotal}</td>
                                        <td>{elemento.total}</td>
                                        <td>{elemento.factura}</td>
                                        <td>{elemento.fechaFactura}</td>
                                        <td>{elemento.RFC}</td>
                                        <td>{elemento.comandaId}</td>
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
                        <h1 className="text-center">TICKET</h1>
                        
                        <div className='format'>
                        <form onSubmit={this.submitHandler}>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Fecha</label>
                                <input type="date" name='fecha' className='form-control' required autoComplete='off' onChange={this.changeHandler} value={this.state.form.fecha} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Forma de Pago</label>
                                <select className="form-select" name='formaPago' required onChange={this.changeHandler} value={this.state.form.formaPago}>
                                    <option value={this.state.form.formaPago}>Tarjeta</option>
                                    <option>Efectivo</option>
                                    <option>PayPal</option>
                                    <option>QR</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Subtotal</label>
                                <input type="number" name='subtotal' className='form-control' required onChange={this.changeHandler} value={this.state.form.subtotal}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label' required>Total</label>
                                <input type="number" name='total' className='form-control' required onChange={this.changeHandler} value={this.state.form.total}/>
                            </div>  
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Factura</label>
                                <br/>
                                <label htmlFor='title' className="form-check-label">Si   </label>
                                <input type="radio" name='factura' className="form-check-input" required onChange={this.changeHandler} value="true"/>
                                <label htmlFor='title' className="form-check-label">   No</label>
                                <input type="radio" name='factura' className="form-check-input" required onChange={this.changeHandler} value="false"/>
                            </div>     
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Fecha de Facturación</label>
                                <input type="date" name='fechaFactura' className='form-control' required onChange={this.changeHandler} value={this.state.form.fechaFactura}/>
                            </div>        
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>RFC</label>
                                <input type="text" name='RFC' className='form-control' required onChange={this.changeHandler} value={this.state.form.RFC}/>
                            </div>    
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>comandaId</label>
                                <input type="number" name='total' className='form-control' required onChange={this.changeHandler} value={this.state.form.comandaId}/>
                            </div>                                                                                                                    
                        </form>
                      </div>
                        
                    </div> 
                    </ModalBody>
                    <ModalFooter>
                            <button type="submit" className='btn btn-primary' onClick={()=>{this.newSubmitHandler(); this.closeModal()}}>Submit</button>
                            <button type="submit" className='btn btn-primary' onClick={()=>this.closeModal()}>Cancel</button>
                    </ModalFooter>
                </Modal> 

                </>
                    );
        
    }
    
}



export default TicketCRUD;
