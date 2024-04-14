import "./App.css";
import React from "react";
import Main from "./component/MainComponent";
import { BrowserRouter } from "react-router-dom";
function App() {
  //hoook
  return (
    <BrowserRouter  basename={process.env.REACT_APP_PUBLIC_URL}>
      <div className="container total">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
