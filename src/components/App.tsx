import React from "react";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Stack gap={3}>
      <Navbar as="header" bg="light">
        <Container>
          <Navbar.Brand>SpaceX</Navbar.Brand>
        </Container>
      </Navbar>
    </Stack>
  );
}

export default App;
