// import axios from "axios";
import { useState } from "react";
// import AuthContext from "./context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authLoginAPI } from "../../../features/slice/authSlice";

// const LOGIN_URL = 'https://fakestoreapi.com/auth/login';

function AuthLoginFrom() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doSubmit = (event) => {
    event.preventDefault();
    dispatch(authLoginAPI({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="row justify-content-center">
      <form name="LoginForm" onSubmit={doSubmit} className="login col-md-6">
        <h1>LOGIN</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address or Username
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email or username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            required
          />
        </div>

        <input type="submit" value="login" className="btn btn-primary" />

        <div className="message">
          {authState.isLoginPending && (
            <div className="mt-2">
              <h6>Sedang login, harap tunggu</h6>
            </div>
          )}
          {authState.isLoginSuccess && navigate("/")}
          {authState.errorMessage && (
            <div className="mt-2">{authState.errorMessage}</div>
          )}
        </div>
      </form>
    </div>
  );
}
export default AuthLoginFrom;
