import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import SignupFormPage from "../SignupFormPage";
import './loginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const demoLogin = (e) => {
    setCredential('Demo-lition')
    setPassword('password')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className='modal-login-container'>
      <div className='login-form-div'>
        <form onSubmit={handleSubmit}>
          <ul className='login-errors'>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <p>Login</p>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
          <button type="button" onClick={(e) => demoLogin(e)}>Demo User</button>
        </form>
      </div>
      <div>
        <h3 className='modal-divider'>--</h3>
      </div>
      <div className='signup-form-div'>
        <SignupFormPage />
      </div>
    </div >
  );
}

export default LoginForm;
