import {Container, Navbar} from 'react-bootstrap';

export default function CustomNavbar(){
    return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">AnimalHouse</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end"> 
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}