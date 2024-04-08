import React, { useState, useContext } from "react";
import { postData } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";
import { UserContext } from "../../context/UserContext";
import "./Login.css";

const Login = () => {
  const { setUserToken } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const spinner = (
    <Oval
      visible={isLoading}
      height="25"
      width="25"
      color="white"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postData(`auth/login`, formData)
      .then((data) => {
        Cookies.set("accessToken", data?.accessToken);
        setUserToken(data?.accessToken);
        setIsLoading(false);
        setTimeout(() => {
          navigate("/categories");
        }, 500);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <h3>Welcome back to ECOMMERCE</h3>
          <p>The next gen business marketplace</p>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div id="show-hide-password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type={"button"}
                className="toggle-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn">
            {isLoading ? spinner : "LOGIN"}
          </button>
          <div className="register-page-link">
            <span>
              Have an account? <Link to="/">&nbsp; SIGN UP</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
