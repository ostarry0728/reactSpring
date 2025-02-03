import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Header from "./include/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Syntax from "./test/Syntax";
import Variable from "./test/Variable";
import State from "./test/State";
import Count from "./test/Count";
import Loop from "./test/Loop";
import Question from "./survey/Question";
import Summary from "./survey/Summary";
import ListMemo from "./memo/ListMemo";
import DetailMemo from "./memo/DetailMemo";
import ListGuestbook from "./guestbook/ListGuestbook";
import WriteGuestbook from "./guestbook/WriteGuestbook";
import DetailGuestbook from "./guestbook/DetailGuestbook";
function App() {
  //console.warn = function no_console() {}; //콘솔창에 경고내용을 보여주지 마라
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Syntax />} />
          <Route path="/test/variable" element={<Variable />} />
          <Route path="/test/state" element={<State />} />
          <Route path="/test/count" element={<Count />} />
          <Route path="/test/loop" element={<Loop />} />
          <Route path="/survey/view" element={<Question />} />
          <Route path="/survey/summary" element={<Summary />} />
          <Route path="/memo" element={<ListMemo />} />
          <Route path="/memo/detail/:product_code" element={<DetailMemo />} />
          <Route path="/guestbook" element={<ListGuestbook />} />
          <Route path="/guestbook/write" element={<WriteGuestbook />} />
          <Route
            path="/guestbook/detail/:product_code"
            element={<DetailGuestbook />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
