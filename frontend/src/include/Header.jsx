import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Header() {
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/test">기초문법</Nav.Link>

              <NavDropdown title="설문" id="basic-nav-dropdown">
                <NavDropdown.Item href="/survey/view">
                  설문조사
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/survay/summary">
                  설문통계
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/memo">한줄메모장</Nav.Link>
              <Nav.Link href="/guestbook">방명록</Nav.Link>
              <Nav.Link href="/product/list">상품관리</Nav.Link>
              <Nav.Link href="#">확장메뉴</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}
