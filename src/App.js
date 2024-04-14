import "./App.css";
import React from "react";
import Main from "./component/MainComponent";
import { HashRouter } from "react-router-dom";
function App() {
  //hoook
  return (
    <HashRouter >
      <div className="container total">
        <Main />
      </div>
    </HashRouter>
  );
}

export default App;
