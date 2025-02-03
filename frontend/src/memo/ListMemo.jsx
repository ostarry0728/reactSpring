import {
  Button,
  Container,
  Table,
  FloatingLabel,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function ListMemo() {
  const navigate = useNavigate();
  const [items, setMemoList] = useState([]);
  const writer = useRef();
  const memo = useRef();
  const search_memo = useRef();

  //http://localhost:8080/memo 메모장정보를 가져와라
  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMemoList(data);
      });
  }

  //마운트 되자마자 메모장 정보를 가져와라.
  useEffect(() => {
    getList("http://localhost:8080/memo");
  }, []);

  return (
    <>
      <Container className="mt-3 p-5">
        <h2 className="text-center">메모장</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="이름 입력"
          className="mb-1"
        >
          <Form.Control
            type="text"
            ref={writer}
            placeholder="이름 입력해주세요"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="메모입력">
          <Form.Control
            type="text"
            ref={memo}
            placeholder="멤모장입력을 입력해주세요"
          />
        </FloatingLabel>
        <div className="d-grid mt-2">
          <Button
            variant="outline-primary"
            onClick={() => {
              const form = new FormData();
              form.append("writer", writer.current.value);
              form.append("memo", memo.current.value);
              //서버에게 메모장 저장요청
              fetch("http://localhost:8080/memo/insert", {
                method: "post",
                body: form,
              }).then(() => {
                //메모장정보를 가져와라 요청
                getList("http://localhost:8080/memo");
                writer.current.value = "";
                memo.current.value = "";
              });
            }}
          >
            메모장저장
          </Button>
        </div>
        <Row className="align-items-center mt-5">
          <Col md={10}>
            <FloatingLabel label="검색입력" className="mb-1">
              <Form.Control name="memo" ref={search_memo} className="mb-2" />
            </FloatingLabel>
          </Col>
          <Col>
            <Button
              type="button"
              className="mb-2"
              onClick={() => {
                getList(
                  `http://localhost:8080/memo?memo=${search_memo.current.value}`
                );
              }}
            >
              내용검색
            </Button>
          </Col>
        </Row>
        <br />
        <div className="d-flex justify-content-center align-items-center my-3">
          {items.length}개의 메모가 있습니다.
          <Button className="ms-3" onClick={() => navigate("/")}>
            홈으로가기
          </Button>
        </div>
        <Table striped className="text-center mt-5">
          <thead>
            <tr>
              <th className="text-bg-primary">번호</th>
              <th className="text-bg-primary">이름</th>
              <th className="text-bg-primary">메모</th>
              <th className="text-bg-primary">날짜</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ IDX, WRITER, MEMO, POST_DATE }) => (
              <tr key={IDX}>
                <td>{IDX}</td>
                <td>{WRITER}</td>
                <td>
                  <Link to={`/memo/detail/${IDX}`}>{MEMO}</Link>
                </td>
                <td>{POST_DATE}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
