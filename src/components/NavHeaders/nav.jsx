import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Nav() {
  return (
    <Container
      class="d-flex justify-content-center"
      style={{
        backgroundColor: "#41605e",
      }}
    >
      <Row>
        <Col xxl={{ offset: 1 }}>
          <p
            class="text-white"
            style={{
              fontSize: 50,
              fontWeight: 600,
            }}
          >
            NC Mail Merge
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Nav;
