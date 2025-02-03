import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GuestbookItem from "./GuestbookItem";
import { Button, Container, FloatingLabel, Form, Table } from "react-bootstrap";

function ListGuestbook() {
  const navigate = useNavigate();
  const [items, setGuestbookList] = useState([]);
  const searchkey = useRef();
  const search = useRef();
  function getList(url) {
    const form = new FormData();
    form.append("searchkey", searchkey.current.value);
    form.append("search", search.current.value);
    console.log(url);
    console.log(searchkey.current.value);
    console.log(search.current.value);
    fetch(url, { method: "post", body: form })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGuestbookList(data);
      });
  }

  //방명록 전체내용 가져옴
  useEffect(() => {
    getList("http://localhost:8080/guestbook");
  }, []);
  return (
    <>
      <Container className="text-center p-5">
        <h2>방명록</h2>

        <Form.Select ref={searchkey}>
          <option value="name">이름</option>
          <option value="contents">내용</option>
          <option value="name_contents">이름+내용</option>
        </Form.Select>
        <FloatingLabel label="검색부분 내용입력" className="mt-1">
          <Form.Control
            name="search"
            ref={search}
            type="text"
            placeholder="검색내용입력"
          />
        </FloatingLabel>
        <div className="d-grid mt-1 mt-1">
          <Button
            variant="outline-primary"
            onClick={() => {
              getList("http://localhost:8080/guestbook");
            }}
          >
            방명록 조회
          </Button>
        </div>
        <div className="mt-5">
          {items.length}개의 메모가 있습니다.
          <Button className="ms-3" onClick={() => navigate("/")}>
            홈으로가기
          </Button>
          <Button className="ms-3" onClick={() => navigate("/guestbook/write")}>
            방명록작성
          </Button>
        </div>
        <Table striped className="text-center mt-5">
          <thead>
            <tr>
              <th className="text-bg-primary">이름</th>
              <th className="text-bg-primary">이메일</th>
              <th className="text-bg-primary">날짜</th>
              <th className="text-bg-primary w-50">내용</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ IDX, NAME, EMAIL, PASSWD, CONTENTS, POST_DATE }) => (
              <GuestbookItem
                idx={IDX}
                name={NAME}
                email={EMAIL}
                passwd={PASSWD}
                contents={CONTENTS}
                post_date={POST_DATE}
                key={IDX}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
export default ListGuestbook;
