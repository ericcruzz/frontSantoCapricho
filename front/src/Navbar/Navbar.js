import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../assets/united.css'
import '../routes'
function BasicExample() {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary" >
      <Container>
        <Navbar.Brand href="/">Santo Capricho</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cliente">Clientes Frecuentes</Nav.Link>
            <Nav.Link href="/platillo">Platillos</Nav.Link>
            <NavDropdown title="Comandas" id="basic-nav-dropdown">
              <NavDropdown.Item href="ticket">Tickets de Venta</NavDropdown.Item>
              <NavDropdown.Item href="comandaPlatillo">
                Comandas-Platillos
              </NavDropdown.Item>
              <NavDropdown.Item href="comanda">Levantar Comandas</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;