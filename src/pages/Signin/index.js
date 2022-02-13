import React from 'react';
import { useState } from 'react';
import './index.css';
import axios from 'axios';

async function SigninUser(data) {
  return axios
    .post('http://localhost:8080/api/v1/admin/auth/login', data)
    .then((res) => res.data.data.token);
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await SigninUser({
      username,
      password,
    });

    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            value={username}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={password}
            type="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
