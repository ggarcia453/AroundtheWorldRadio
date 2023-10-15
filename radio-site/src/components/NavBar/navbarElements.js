import React from "react";
import Nav from 'react-bootstrap/Nav'; 
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const NavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Around the World Radio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">AboutUs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};
 
export default NavBar;