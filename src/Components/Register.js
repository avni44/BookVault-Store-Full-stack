import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [passError, setPassError] = useState("null");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const checkPassword = (event) => {
        const confirmPassword = event.target.value;
        if (confirmPassword !== user.password) {
            setPassError("Passwords do not match");
        } else {
            setPassError(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/registers",user);
            alert("Registration successful!");
            navigate("/login");
        }
        catch (error) {
            alert("Registration failed. Please try again.");
        }
    };

    return(
        <div className="col-md-4 mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
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

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        onChange={checkPassword}
                        required
                    />
                    {passError !== "null" && <small className="text-danger">{passError}</small>}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary mt-3" disabled={passError !== null}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );

}