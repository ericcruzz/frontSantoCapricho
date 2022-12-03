import React from 'react';
import Tacos from './assets/tacos.jpg'
class Home extends React.Component {

    render() {
        return <div style={{
            backgroundImage: 'url(https://img.freepik.com/free-photo/mexican-fresh-food_23-2147640311.jpg?w=1060&t=st=1669588626~exp=1669589226~hmac=7d3d70404ef61d6df069d5fcb4cfe211fe48c6291729d03c4879478cad1f1229)'}}>
            <img src={Tacos} height="auto" width='100%'/>
            
        </div>;
    }
}

export default Home;