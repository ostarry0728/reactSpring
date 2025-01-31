import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function State() {
  //멤버변수(기본타입, 객체타입), 멤버함수(계산함수, 이벤트함수)
  const [name, setName] = useState(["ost", "zeus", "hgd"]);
  return (
    <Container className="mt-3">
      <div className="d-grid gap-1">
        <Button action className="text-bg-primary">
          {name[0]}
        </Button>
        <Button action className="text-bg-warning">
          {name[1]}
        </Button>
        <Button action className="text-bg-secondary">
          {name[2]}
        </Button>
      </div>
    </Container>
  );
}
