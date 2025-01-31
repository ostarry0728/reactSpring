import React from "react";
import { Container } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

export default function Variable() {
  //멤버변수
  let name = "zeus";
  let message = "hello";
  return (
    <Container className="mt-3">
      <div className="d-grid gap-1">
        <Button variant="primary">{name}</Button>
        <Button className="text-bg-warning">{message}</Button>
      </div>
    </Container>
  );
}
