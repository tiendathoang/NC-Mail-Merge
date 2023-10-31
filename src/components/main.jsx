import React from "react";
import { Container, Row } from "react-bootstrap";
import Importfields from "./ImportFields/importfields";
import Nav from "./NavHeaders/nav";
import { mainGreen } from "../constants/constant";

function Main() {
  return (
    <Container style={mainContainer}>
      <Row>
        <Nav />
      </Row>
      <Row>
        <Importfields />
      </Row>
    </Container>
  );
}

const mainContainer = {
  justifyContent: "space-between",
  width: "50%",
  backgroundColor: mainGreen,
};

export default Main;
