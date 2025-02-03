import React, { useRef, useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}
function DetailMemo() {
  const paths = window.location.href.split("/");
  const url =
    "http://localhost:8080/memo/" +
    paths[paths.length - 2] +
    "/" +
    paths[paths.length - 1];
  const [data, loading] = useFetch(url);
  const navigate = useNavigate();
  const writer = useRef();
  const memo = useRef();
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        <Container className="text-center p-5">
          <h2>메모장</h2>
          <FloatingLabel label="이름" className="mb-1">
            <Form.Control
              name="writer"
              ref={writer}
              type="text"
              defaultValue={data.WRITER}
            />
          </FloatingLabel>
          <FloatingLabel label="메모수정" className="mb-1">
            <Form.Control name="memo" ref={memo} defaultValue={data.MEMO} />
          </FloatingLabel>
          <FloatingLabel label="날짜" className="mb-1">
            <Form.Control type="text" defaultValue={data.POST_DATE} disabled />
          </FloatingLabel>
          <div className="mt-4 d-flex justify-content-center gap-2">
            <Button
              variant="outline-primary"
              onClick={() => {
                const form = new FormData();
                form.append("idx", data.IDX);
                form.append("writer", data.WRITER);
                form.append("memo", memo.current.value);
                console.log("memo.current.value =" + memo.current.value);
                fetch("http://localhost:8080/memo/update", {
                  method: "post",
                  body: form,
                }).then(() => {
                  navigate("/memo");
                });
              }}
            >
              메모장수정
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                if (window.confirm("삭제할까요?")) {
                  fetch(`http://localhost:8080/memo/delete?idx=${data.IDX}`, {
                    method: "delete",
                  }).then(() => {
                    navigate("/memo");
                  });
                }
              }}
            >
              메모장삭제
            </Button>
            <Button variant="outline-primary" onClick={() => navigate("/memo")}>
              메모장목록
            </Button>
          </div>
        </Container>
      </>
    );
  }
}
export default DetailMemo;
