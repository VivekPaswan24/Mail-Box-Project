import React from "react";

import { Navbar, Container } from "react-bootstrap";

const MainNavigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Mail Box</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
