import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./style.css";

export default function Login() {
  const [login, setLogin] = useState(true);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      localStorage.setItem("token", result.data.data);
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Login failed:", error.response.data);
      toast.error(error.response.data.errors[0], {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/", {
        name,
        email,
        password,
      });
      if (response) {
        toast.success("Registration successful!", {
          position: "bottom-right",
          autoClose: 2000,
        });
        setLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast.error(error.response.data.errors[0][0], {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="side-title">
        <img
          src="https://img.icons8.com/?size=100&id=K64BmSGjcwqt&format=png&color=000000"
          alt=""
        />
        <h1>Study Register</h1>
        <h3>Track your progress</h3>
        <progress max="100" value="33"></progress>
      </div>
      {login ? (
        <div className="logForm">
          <h1>Login</h1>
          <form onSubmit={handleLogin} method="post">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <h5>
            <a
              href="#"
              onClick={() => {
                setLogin(false);
                setEmail("");
                setPassword("");
              }}
            >
              Don't have an account? Register now!
            </a>
          </h5>
          <ToastContainer />
        </div>
      ) : (
        <div className="logForm">
          <h1>Register</h1>
          <form onSubmit={handleRegister} method="post">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <h5>
            <a
              href="#"
              onClick={() => {
                setLogin(true);
                setEmail("");
                setPassword("");
              }}
            >
              Already have an account? Login now!
            </a>
          </h5>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}
