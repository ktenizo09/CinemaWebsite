import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



const NavBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/movies">Movie House</Navbar.Brand>

        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Search for a movie"
            className="me-2"
            aria-label="Search"
            id="searchBar"value={query}
            onChange={(e) => setQuery(e.target.value)}
        
          />
          <Button variant="outline-success" type="submit" >Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;