import { Routes, Route } from "react-router";
import { Navigate } from "react-router";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route default path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
