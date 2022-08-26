import logo from "./logo.svg";
import './App.css';
import { Header } from "components/Header";

import "./styles/index.css";
import { Router } from "components/Router";
import { ToastWrapper } from "components/Toast/ToastWrapper";


function App() {
  return (
    <div className="App">
      <ToastWrapper />
      <Header />
      <Router />
    </div>
  );
}

export default App;
