import React from 'react';
import axios from 'axios'; 
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');

const urlPut = "https://santo-capricho-back.herokuapp.com/platillo/editar/"
const urlGet="https://santo-capricho-back.herokuapp.com/platillo/buscar/"
const urlPost="https://santo-capricho-back.herokuapp.com/platillo/insertar"
const urlDelete="https://santo-capricho-back.herokuapp.com/platillo/borrar/"

class PlatilloCRUD extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        posts:[],
        modalInsert: false,
        modalType: false,
        form:{
            platilloId:'',
            nombre:'',
            precio:'',
            tipoPlatillo:''
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
            platilloId:'',
            nombre:'',
            precio:'',
            tipoPlatillo:''
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
                        <Button color='primary' onClick={()=>this.newModal()}>Nuevo Platillo</Button>
                        <br />
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Tipo de Platillo</th>
                                    <th>        </th>
                                    <th>        </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((elemento, platilloId)=>(
                                    <tr key={platilloId}>
                                        <td>{elemento.platilloId}</td>
                                        <td>{elemento.nombre}</td>
                                        <td>{elemento.precio}</td>
                                        <td>{elemento.tipoPlatillo}</td>                                     
                                        <td>
                                            <Button color='primary' onClick={()=> this.deleteHandler(elemento)}>Eliminar</Button>
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
                        <h1 className="text-center">PLATILLO</h1>
                        
                        <div className='format'>
                        <form onSubmit={this.submitHandler}>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Nombre del Platillo</label>
                                <input type="text" name='nombre' className='form-control' required autoComplete='off' onChange={this.changeHandler} value={this.state.form.cantidad}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Precio</label>
                                <input type="number" name='precio' className='form-control' required onChange={this.changeHandler} value={this.state.form.condimentos}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor='title' className='add-label'>Tipo de Platillo</label>
                                <select className="form-select" name='tipoPlatillo' required onChange={this.changeHandler} value={this.state.form.tipoServicio}>
                                    <option>POSTRE</option>
                                    <option>TACOS</option>
                                    <option>GRINGAS</option>
                                    <option>VOLCANES</option>
                                    <option>COSTRAS</option>
                                    <option>ALAMBRES</option>
                                    <option>BEBIDA</option>
                                </select>
                            </div>                        
                        </form>
                      </div>
                        
                    </div> 
                    </ModalBody>
                    <ModalFooter>
                            <button type="submit" className='btn btn-primary' onClick={()=>{this.newSubmitHandler(); this.closeModal(); window.location.reload()}}>Submit</button>
                            <button type="submit" className='btn btn-primary' onClick={()=>this.closeModal()}>Cancel</button>
                    </ModalFooter>
                </Modal> 
                
                </>
                    );
        
    }
    
}
export default PlatilloCRUD;