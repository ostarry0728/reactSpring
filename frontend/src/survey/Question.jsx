import React, { useRef, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

export default function Question() {
  const url = "http://localhost:8080/survey/view/1";
  const [item, setItem] = useState([]);
  const [rdo, setRdo] = useState();
  const navigate = useNavigate();

  function getItem(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItem(data);
      });
  }
  const handleOptionChange = (e) => {
    setRdo(e.target.value);
  };

  useEffect(() => {
    getItem(url);
  }, []);

  return (
    <Container className="text-center p-5">
      <h2 className="text-center">{item.QUESTION}</h2>
      <label>
        <input
          name="answer"
          type="radio"
          value="1"
          checked={rdo === "1"}
          onChange={handleOptionChange}
        />
        {item.ANS1}문항1
      </label>
      <label>
        <input
          className="ms-3"
          name="answer"
          type="radio"
          value="2"
          checked={rdo === "2"}
          onChange={handleOptionChange}
        />
        {item.ANS2}문항2
      </label>
      <label>
        <input
          className="ms-3"
          name="answer"
          type="radio"
          value="3"
          checked={rdo === "3"}
          onChange={handleOptionChange}
        />
        {item.ANS3}문항3
      </label>
      <label>
        <input
          className="ms-3"
          name="answer"
          type="radio"
          value="4"
          checked={rdo === "4"}
          onChange={handleOptionChange}
        />
        {item.ANS4}문항4
      </label>
      {/* 이벤트 현정보를 서버로 보낸다 (post) */}
      <Button
        variant="outline-danger"
        className="ms-3"
        onClick={() => {
          const form = new FormData();
          form.append("survey_idx", item.SURVEY_IDX);
          form.append("num", rdo);
          fetch("http://localhost:8080/survey/insert", {
            method: "post",
            body: form,
          }).then(() => {
            navigate("/survey/summary");
          });
        }}
      >
        확인
      </Button>
    </Container>
  );
}
