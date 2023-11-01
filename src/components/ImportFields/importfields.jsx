import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getExcelFiles } from "../../controller/ReadExcelFiles";

import { mainGreen } from "../../constants/constant";
import SearchBar from "../SearchBar/searchbar";
import EmployeeDEtail from "../employeedetail/employeedetail";
import { generateDoc } from "../../controller/ReadDoc";

const errorDefaultState = {
  errorState: false,
  errorText: "Something went wrong. Please try again",
};

function Importfields() {
  const [inputDataState, setInputDataState] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [excelSheet, setExcelSheet] = useState(null);
  const [error, setError] = useState(errorDefaultState);
  const [textDisplay, setTextDisplay] = useState("");
  //   const

  useEffect(() => {
    console.log("kekeke", file?.files[0].name);
  }, [file]);

  const onClickReset = ({ changeSheet, changeFile }) => {
    if (changeSheet) {
      setExcelSheet(null);
      setTextDisplay("");
    }
    if (changeFile) {
      setFile(null);
    }
    setInputDataState([]);
    setSelectedEmployee(null);

    setError(errorDefaultState);
  };

  const onClick = () => {
    if (!file) {
      setError({
        errorState: true,
        errorText: "Please provide files",
      });
      return;
    }
    if (!excelSheet || excelSheet === "NaN") {
      setError({
        errorState: true,
        errorText: "Please input correct excel sheet",
      });
      return;
    }
    setError(errorDefaultState);
    getExcelFiles(file, setInputDataState, excelSheet, setError);
  };

  const onClickChangeSheet = () => onClickReset({ changeSheet: true });
  const onClickChangeFile = () => onClickReset({ changeFile: true });

  return (
    <Container
      style={{
        backgroundColor: "white",
        width: "80%",
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
      }}
    >
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Master file</Form.Label>
        <Form.Control
          value={!file?.files[0] ? "" : undefined}
          onChange={(value) => setFile(value.target)}
          type="file"
        />
      </Form.Group>
      <div style={{ marginBottom: 20 }}>
        <Form.Label>Sheet number:</Form.Label>
        <Form.Control
          type="text"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          value={textDisplay}
          onChange={(value) => {
            setTextDisplay(value.target.value);
            setExcelSheet(parseInt(value.target.value));
          }}
        />
        <Form.Text id="passwordHelpBlock" muted>
          Please provide excel sheet number
        </Form.Text>
      </div>
      <Row className="justify-content-md-center" xl={4}>
        <Col>
          <Button
            onClick={onClick}
            style={{
              backgroundColor: mainGreen,
              marginBottom: 15,
              borderWidth: 0,
            }}
          >
            Generate mail
          </Button>
        </Col>
        <Col>
          <Button
            onClick={generateDoc}
            style={{
              backgroundColor: mainGreen,
              marginBottom: 15,
              borderWidth: 0,
            }}
          >
            Generate docx
          </Button>
        </Col>

        <Col>
          <Button
            onClick={onClickChangeFile}
            style={{
              backgroundColor: mainGreen,
              marginBottom: 15,
              borderWidth: 0,
            }}
          >
            Change file
          </Button>
        </Col>
        <Col>
          <Button
            onClick={onClickChangeSheet}
            style={{
              backgroundColor: mainGreen,
              marginBottom: 15,
              borderWidth: 0,
            }}
          >
            Change sheet
          </Button>
        </Col>
      </Row>

      {!!inputDataState.length && (
        <SearchBar
          {...{ inputDataState, setSelectedEmployee, selectedEmployee }}
        />
      )}
      {!!selectedEmployee && <EmployeeDEtail {...{ selectedEmployee }} />}
      {error.errorState && (
        <div
          style={{
            marginTop: 10,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
          }}
          class="alert alert-warning"
          role="alert"
        >
          {error.errorText}
        </div>
      )}
    </Container>
  );
}

export default Importfields;
