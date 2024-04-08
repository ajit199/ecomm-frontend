import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./VerifyOtp.css";

const VerifyOtp = () => {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // Extract email from URL parameters
  const email = new URLSearchParams(location.search).get("email");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your email has been verified.");
    navigate("/login");
  };

  if (!email) {
    return navigate("/");
  }

  return (
    <>
      <div className="code-form-container">
        <form onSubmit={handleSubmit} className="code-form">
          <h2>Verify your email</h2>
          <p>Enter the 8 digit code you have received on {email}</p>
          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Enter Code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="verify-btn">
            VERIFY
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyOtp;
