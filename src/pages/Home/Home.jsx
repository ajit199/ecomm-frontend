import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Our Awesome Website</h1>
      <p>
        Discover amazing products and enjoy a seamless shopping experience with
        us.
      </p>
      <div>
        <Link to="/login" className="login-btn">
          Login
        </Link>
        <Link to="/register" className="register-btn">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
