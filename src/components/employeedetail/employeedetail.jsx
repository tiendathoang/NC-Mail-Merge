import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function EmployeeDEtail({ selectedEmployee }) {
  const getLocationDate = (date) => {
    if (!date) return "Invalid date input";
    const dateArr = date.split("-");
    const month = date.slice(-3);

    return {
      startDate: `${dateArr[0]} ${month}`,
      endDate: `${dateArr[1]}`,
    };
  };
  const firstModuleDate = getLocationDate(selectedEmployee?.firstModuleDate);
  const secondModuleDate = getLocationDate(
    selectedEmployee?.secondModuleLength
  );

  const renderPersonalPlan = () => {
    const period = selectedEmployee.personalPlanPeriod;
    if (!period || period === "NA" || period === "N/A") return null;
    const date = getLocationDate(period);
    return (
      <>
        <p class="fs-1">Personal Plan</p>
        <Row>
          <Col xl={3}>Start date: </Col>
          <Col>{date.startDate}</Col>
        </Row>
        <Row>
          <Col xl={3}>Start date: </Col>
          <Col>{date.endDate}</Col>
        </Row>
        <Row>
          <Col xl={3}>Outside DK: </Col>
          <Col>???</Col>
        </Row>
      </>
    );
  };

  const getDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <Container style={{ margin: 5, marginTop: 20 }}>
      <p>
        Dear {selectedEmployee.employeeName},<br />
      </p>
      <p>
        You are hereby enrolled to the following training in Denmark with
        Netcompany A/S. Please find below the detailed of your training:
      </p>
      <p>
        <u>
          Module 1: {selectedEmployee.firstModuleLocation} <br />
        </u>
        Location: Denmark
        <br />
        Period: {firstModuleDate.startDate} - {firstModuleDate.endDate}
        <br />
        Course description: [awaits repsective seminar description]
        <br />
        Agenda: please find the appendix of module 1 attaches with this
        invitation letter
      </p>
      <p>
        <u>Module 2: On-the-job-training</u>
        <br />
        Location: {selectedEmployee.secondModuleLocation}
        <br />
        Period: {secondModuleDate.startDate} - {secondModuleDate.endDate}
        <br />
        Course description:
        <ul>
          <li>This is placeholder</li>
          <li>
            Module 2 is primarily a module regarding the practical skills needed
            in the business. Employees enjoy the daily feedback, coaching and
            learnings from their managers and peers.
          </li>
          <li>
            Module 2 will always be an individual learning experience, because
            it depends on which prior module they have been on and which of the
            following skills, they need to practise.
          </li>
          <li>
            Skills to practise in module 2 are i.e., Netcompany Methodology,
            Proper Code Writing, Documenting you code, Client Engagement,
            Project Management, Teamwork and Netcompany values and business
            model.
          </li>
          <li>
            Above mentioned skills should be part of the day-to-day work and
            training.
          </li>
        </ul>
      </p>
      <p>
        Agenda: please find the appendix of module 2 attaches with this
        invitation letter
      </p>
      <p>
        The purpose of the {selectedEmployee.firstModuleLocation} is to give
        employees an introduction to:
        <ul>
          <li>This is a place holder</li>
          <li>
            Netcompany and our core values, career model, employee performance
            appraisal and mentor discussions
          </li>
          <li>Their role in Netcompany</li>
          <li>
            Protocal during client projects and team-based projects, including
            professionalism and written and verbal communication
          </li>
          <li>
            Netcompany Methodology, including the disciplines of requirements,
            analysis and design, implementation and testing, use of
            documentation and our current tools.
          </li>
        </ul>
      </p>
      <p>
        Upon completion of this training:
        <ul>
          <li>This is a placeholdeer</li>
          <li>
            Have gained an understanding of the role as consultant at
            Netcompany.
          </li>
          <li>Have gained an undersntading of Netcompany methodology.</li>
          <li>
            Have increased the awareness of protocol during client projects and
            team-based projects.
          </li>
        </ul>
      </p>
      <p>
        Transport: The Company will cover all costs associated with the employee
        travel to Denmark. Accommodation: The Company will provide suitable
        accommodation in Denmark during the stay. Travel Insurance: The Company
        has travel insurance in place to cover all employees travelling abroad.
      </p>
      <p style={{ textAlign: "right", marginRight: 16 }}>{getDate()}</p>
      {/* <Row>
        <Col xl={3} class="fs-2">
          Employee name:
        </Col>
        <Col class="fs-2">{selectedEmployee.employeeName}</Col>
      </Row>
      <p class="fs-1">Module 1</p>
      <Row>
        <Col xl={3}>Location:</Col>
        <Col>DK</Col>
      </Row>
      <Row>
        <Col xl={3}>Start date:</Col>
        <Col> {firstModuleDate?.startDate}</Col>
      </Row>
      <Row>
        <Col xl={3}>End date:</Col>
        <Col>{firstModuleDate?.endDate}</Col>
      </Row>
      <Row>
        <Col>Description: ??</Col>
      </Row>
      <p class="fs-1">Module 2</p>
      <Row>
        <Col xl={3}>Location:</Col>
        <Col>{selectedEmployee.secondModuleLocation}</Col>
      </Row>
      <Row>
        <Col xl={3}>Start date:</Col>
        <Col>{secondModuleDate.startDate}</Col>
      </Row>
      <Row>
        <Col xl={3}>Start date:</Col>
        <Col>{secondModuleDate.endDate}</Col>
      </Row>
      <Row>
        <Col xl={3}>Agenda: </Col>
        <Col>???</Col>
      </Row>
      {renderPersonalPlan()} */}
    </Container>
  );
}

export default EmployeeDEtail;
