import React, { useRef, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router";

function Summary() {
  //문제 정보
  const [question, setQuestion] = useState([]);
  function getQuestion(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuestion(data);
      });
  }
  const url = "http://localhost:8080/survey/view/1";
  useEffect(() => {
    getQuestion(url);
  }, []);
  //설문결과정보
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
      });
  }
  useEffect(() => {
    getList("http://localhost:8080/survey/summary/1");
  }, []);
  return (
    <>
      <Container className="mt-3">
        <h2 className="text-center">{question.QUESTION}</h2>
        <Table striped className="text-center">
          <thead>
            <tr>
              <th colSpan={2} className="text-bg-primary">
                번호
              </th>
              <th className="text-bg-primary">응답횟수</th>
              <th className="text-bg-primary">응답비율</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ NUM, SUM_NUM, RATE }) => (
              <tr key={NUM}>
                <td>{NUM}</td>
                <td>
                  {NUM === 1 ? question.ANS1 : null}
                  {NUM === 2 ? question.ANS2 : null}
                  {NUM === 3 ? question.ANS3 : null}
                  {NUM === 4 ? question.ANS4 : null}
                </td>
                <td>{SUM_NUM}</td>
                <td>{RATE}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-grid gap-2">
          <Button variant="primary" href="/survey/view">
            설문메인
          </Button>
          <Button variant="secondary" href="/">
            HOME
          </Button>
        </div>
      </Container>
    </>
  );
}
export default Summary;
