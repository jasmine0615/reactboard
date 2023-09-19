import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SideNavBar from "./components/SideNavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sideNavBar" element={<SideNavBar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
