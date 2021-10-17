import React from "react";
import { Router } from "./Router";
import { Header } from "./components/organisms/Header";
import "./assets/style.css";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Router />
    </>
  );
}

export default App;
