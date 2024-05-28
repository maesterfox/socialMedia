import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import ErrorBoundary from "../../components/ErrorBoundary";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        inputs
      );
      // Handle success response and navigate to login
      console.log("User registered successfully:", res.data);
      navigate("/login");
    } catch (err) {
      setErr(err.response?.data || "An error occurred during registration");
    }
  };

  console.log(err);

  return (
    <ErrorBoundary>
      <div className="register">
        <div className="card">
          <div className="left">
            <h1>Fox Social.</h1>
            <p>
              Fox Social is a social media platform where you can share your
              thoughts and connect with other people.
            </p>
            <span>Do you have an account?</span>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div className="right">
            <h1>Register</h1>
            <form>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
              {err && (
                <div className="error">
                  {typeof err === "string" ? (
                    err
                  ) : (
                    <pre>{JSON.stringify(err, null, 2)}</pre>
                  )}
                </div>
              )}
              <button onClick={handleClick}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Register;
