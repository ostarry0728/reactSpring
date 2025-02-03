import React, { useRef } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";
function WriteGuestbook() {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const passwd = useRef();
  const contents = useRef();
  return (
    <>
      <Container className="p-5">
        <Form>
          <Form.Group controlId="formGridEmail">
            <Form.Label>이름</Form.Label>
            <Form.Control ref={name} type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="formGridPassword">
            <Form.Label>이메일</Form.Label>
            <Form.Control ref={email} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              ref={passwd}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>본문</Form.Label>
            <Form.Control ref={contents} as="textarea" rows={5} />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              const form = new FormData();
              form.append("name", name.current.value);
              form.append("email", email.current.value);
              form.append("passwd", passwd.current.value);
              form.append("contents", contents.current.value);
              fetch("http://localhost:8080/guestbook/insert", {
                method: "post",
                body: form,
              }).then(() => {
                navigate("/guestbook");
              });
            }}
          >
            저장
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => navigate("/guestbook")}
          >
            목록
          </Button>
        </div>
      </Container>
    </>
  );
}
export default WriteGuestbook;
