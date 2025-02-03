import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
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
function DetailGuestbook() {
  const paths = window.location.href.split("/");
  //http://localhost:5173/guestbook/detail/1
  const url =
    "http://localhost:8080/guestbook/" +
    paths[paths.length - 2] +
    "/" +
    paths[paths.length - 1];
  const [data, loading] = useFetch(url);
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const passwd = useRef();
  const contents = useRef();
  const [message, setMessage] = useState();
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        <Container className="p-5">
          <Form>
            <Form.Group controlId="formGridEmail">
              <Form.Label>이름</Form.Label>
              <Form.Control
                ref={name}
                defaultValue={data.NAME}
                type="text"
                placeholder="Enter name"
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                ref={email}
                defaultValue={data.EMAIL}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>비밀번호</Form.Label>
              <span style={{ color: "red" }}>{message}</span>
              <Form.Control
                ref={passwd}
                type="password"
                defaultValue={data.PASSWD}
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group controlId="formGridEmail">
              <Form.Label>날짜</Form.Label>
              <Form.Control
                defaultValue={data.POST_DATE}
                type="text"
                disabled
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>본문</Form.Label>
              <Form.Control
                ref={contents}
                defaultValue={data.CONTENTS}
                as="textarea"
                rows={5}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center gap-2">
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                const form = new FormData();
                form.append("idx", data.IDX);
                form.append("name", data.NAME);
                form.append("email", data.EMAIL);
                form.append("passwd", passwd.current.value);
                form.append("contents", contents.current.value);
                console.log("passwd" + passwd.current.value);
                console.log("contents" + contents.current.value);
                fetch("http://localhost:8080/guestbook/update", {
                  method: "post",
                  body: form,
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    if (data.result == "success") {
                      navigate("/guestbook");
                    } else {
                      setMessage("비밀번호가 일치하지 않습니다.");
                    }
                  });
              }}
            >
              수정
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                if (window.confirm("삭제할까요?")) {
                  const form = new FormData();
                  form.append("idx", data.IDX);
                  form.append("passwd", passwd.current.value);
                  fetch("http://localhost:8080/guestbook/delete", {
                    method: "post",
                    body: form,
                  })
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                      if (data.result == "success") {
                        navigate("/guestbook");
                      } else {
                        setMessage("비밀번호가 일치하지 않습니다.");
                      }
                    });
                }
              }}
            >
              삭제
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
}
export default DetailGuestbook;
