import React from "react";
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

export default function Loop() {
  //객체배열변수
  const item = [
    { name: "사과", price: 5000 },
    { name: "포도", price: 4000 },
    { name: "망고", price: 3000 },
  ];

  return (
    <Container className="text-center p-5">
      <h2 className="text-center">상품목록</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-bg-primary">번호</th>
            <th className="text-bg-primary">상품이름</th>
            <th className="text-bg-primary">가격</th>
          </tr>
        </thead>
        <tbody>
          {item.map((data, index) => (
            <tr key={data.name}>
              <td>{index}</td>
              <td>{data.name}</td>
              <td>{data.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
