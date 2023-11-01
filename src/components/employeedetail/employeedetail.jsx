import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { generateDoc } from "../../controller/ReadDoc";
import { mainGreen, seminarDesc } from "../../constants/constant";

function EmployeeDEtail({ selectedEmployee }) {
  const getLocationDate = (date) => {
    if (!date || date === "NA" || date === "N/A")
      return { startDate: "", endDate: "" };
    const dateArr = date.includes("-") ? date.split("-") : [date, date];
    const month = date.slice(-3);

    return {
      startDate: `${dateArr[0]} ${date.includes("-") ? month : ""}`,
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

  const seminarDetail = seminarDesc[`${selectedEmployee.firstModuleLocation}`];

  return (
    <Container style={{ marginTop: 20 }}>
      <Button
        onClick={() =>
          generateDoc({
            employeeName: selectedEmployee.employeeName,
            employeeInitials: selectedEmployee.initials,
            module1Location: selectedEmployee.firstModuleLocation,
            module1StartDate: firstModuleDate.startDate,
            module1EndDate: firstModuleDate.endDate,
            secondModuleStartDate: secondModuleDate.startDate,
            secondModuleEndDate: secondModuleDate.endDate,
            secondModuleLocation: selectedEmployee.secondModuleLocation,
            toDay: getDate,
            seminarDetail,
          })
        }
        style={{
          backgroundColor: mainGreen,
          marginBottom: 15,
          borderWidth: 0,
        }}
      >
        Generate docx
      </Button>
      <p>
        Dear {selectedEmployee.employeeName},<br />
      </p>
      <p>
        You are hereby enrolled to the following training in Denmark with
        Netcompany A/S. Please find below the detailed of your training:
      </p>
      <p>
        <u>
          Module 1: {seminarDetail?.title} <br />
        </u>
        Location: Denmark
        <br />
        Period: {firstModuleDate.startDate} - {firstModuleDate.endDate}
        <br />
        Course description:
        <br />
        {seminarDetail?.heads1 ?? null}
        <ul>
          {seminarDetail?.bullets1
            ? seminarDetail.bullets1.map((item) => <li>{item}</li>)
            : null}
        </ul>
        {seminarDetail?.heads2 ?? null}
        <ul>
          {seminarDetail?.bullets2
            ? seminarDetail.bullets2.map((item) => <li>{item}</li>)
            : null}
        </ul>
        {seminarDetail?.heads3 ?? null}
        <ul>
          {seminarDetail?.bullets3
            ? seminarDetail.bullets3.map((item) => <li>{item}</li>)
            : null}
        </ul>
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
      {seminarDetail?.complete}
      <ul>
        {seminarDetail?.completeBullets
          ? seminarDetail.completeBullets.map((item) => <li>{item}</li>)
          : null}
      </ul>
      <p>
        Transport: The Company will cover all costs associated with the employee
        travel to Denmark. Accommodation: The Company will provide suitable
        accommodation in Denmark during the stay. Travel Insurance: The Company
        has travel insurance in place to cover all employees travelling abroad.
      </p>
      <p style={{ textAlign: "right", marginRight: 16 }}>{getDate()}</p>
    </Container>
  );
}

export default EmployeeDEtail;
