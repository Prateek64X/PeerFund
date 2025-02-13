// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for routing

const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg" className="glass-effect ps-4">
      <Navbar.Brand as={Link} to="/">PeerFund</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/my-peers">My Peers</Nav.Link>
          <Nav.Link as={Link} to="/create-project">Create Project</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;