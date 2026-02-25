import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/navbar.jsx";
import { Appcontent } from "../context/appContent.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedin } = useContext(Appcontent);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      setLoading(true);
      const { data } = await axios.post("https://dropnestwebapp.onrender.com/api/auth/login", {
        email,
        password,
      });
      setIsLoggedin(true);
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     

      <Navbar />

      <div className="login-root">
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">
              Welcome <span>Back</span>
            </h2>
            <p className="login-subtitle">Sign in to access your secure storage</p>

            <form onSubmit={onSubmitHandler}>
              <div className="login-field">
                <label className="login-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="login-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label className="login-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-forgot">
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <><div className="login-spinner" /> Signing in...</>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="login-divider">
              <div className="login-divider-line" />
              <span>or</span>
              <div className="login-divider-line" />
            </div>

            <p className="login-signup">
              Don't have an account?{" "}
              <Link to="/signup">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;