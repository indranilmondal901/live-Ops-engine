import React, { useState } from 'react';
import Navbar from '../navbar/Navbar'
import '../login/Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = {
      username: username,
      password: password,
    };
    await axios.post("http://localhost:8080/login", loginData)
      .then((res) => {
        localStorage.setItem("loginToken", res.data.token)
        window.alert("login Sucessful");
      }).catch((err) => {
        console.log(err)
        window.alert("invalid credential")
      })
  }
  return (
    <div>
      <Navbar />
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input type="email"
          id="username"
          name="username"
          placeholder="enter your email"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="password">Password</label>
        <input type="password"
          id="password"
          name="password"
          placeholder="enter your password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login
