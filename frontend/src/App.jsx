import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./include/Header";
import Syntax from "./test/Syntax";
import Variable from "./test/Variable";
import State from "./test/State";
import Count from "./test/Count";
import Loop from "./test/Loop";
import Question from "./survey/Question";
import Summary from "./survey/Summary";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 기초문법 */}
          <Route path="/test" element={<Syntax />} />
          <Route path="/test/variable" element={<Variable />} />
          <Route path="/test/state" element={<State />} />
          <Route path="/test/count" element={<Count />} />
          <Route path="/test/loop" element={<Loop />} />
          {/* 설문조사 */}
          <Route path="/survey/view" element={<Question />} />
          <Route path="/survey/summary" element={<Summary />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
