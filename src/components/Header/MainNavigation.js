import React from "react";

import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const navigate=useNavigate()
  const logoutHandler=()=>{
    localStorage.removeItem('email');
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Mail Box</Navbar.Brand>
        <Button onClick={logoutHandler}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
