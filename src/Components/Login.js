import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(UserContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(""); 

    if (user.username.length < 3) {
    setLoginError("Username must be at least 3 characters");
    return;
  }
    try {
      const response = await axios.post("http://localhost:8080/logins", user);
      setLoggedUser(response.data);
      localStorage.setItem("loggedUser", JSON.stringify(response.data));
      alert("Login successful!");
      navigate("/"); // redirect to home page
    } catch (error) {
      // Show backend error or fallback message
      setLoginError(error.response?.data || "Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="col-md-4 mx-auto mt-5">
      <h2 className="mb-3">Login</h2>

      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
