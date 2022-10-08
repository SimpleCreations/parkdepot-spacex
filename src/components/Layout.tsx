import React from "react";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <Stack gap={3}>
    <Navbar as="header" bg="light">
      <Container>
        <Navbar.Brand>SpaceX</Navbar.Brand>
      </Container>
    </Navbar>
    <Outlet />
  </Stack>
);

export default Layout;
