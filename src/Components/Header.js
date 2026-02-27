import React, { useContext, useState } from "react";  // ✅ Added useState
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const Header = () => {
  const { loggedUser, setLoggedUser, cartCount, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);  //Admin dropdown options

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setLoggedUser(null);
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold fs-3">📚 BookVault Store</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/book-list" className="nav-link">📖 Books</Link>
              </li>
              {loggedUser && (
                <li className="nav-item position-relative">
                  <Link to="/cart" className="nav-link">
                    🛒 Cart ({cartCount})
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/admin-login" className="nav-link">
                  Admin Login
                </Link>
              </li>

              {!loggedUser ? (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </>
              ) : isAdmin ? (
                <>
                  <li className="nav-item position-relative">
                    <button 
                      className="nav-link text-warning fw-bold border-0 bg-transparent p-0 text-start dropdown-toggle-custom"
                      onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                      style={{ cursor: 'pointer' }}
                    >
                      👑 Admin: {loggedUser.username} ▼
                    </button>
                    
                    {showAdminDropdown && (
                      <ul className="dropdown-menu-custom show position-absolute shadow-lg border-0 mt-2" 
                          style={{ 
                            top: '100%', 
                            right: 0, 
                            minWidth: '250px',
                            zIndex: 1050,
                            background: 'white',
                            borderRadius: '12px'
                          }}>
                        <li>
                          <Link className="dropdown-item px-4 py-3" to="/add-book">
                            ➕ Add Book
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item px-4 py-3" to="/profile">
                            👤 Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item px-4 py-3" to="/book-list">
                            📋 Manage Books
                          </Link>
                        </li>
                        <li><hr className="dropdown-divider mx-3 my-0" /></li>
                        <li>
                          <button className="dropdown-item px-4 py-3 text-danger fw-bold" onClick={handleLogout}>
                            🚪 Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              ) : (
                //Normal user options
                <>
                  <li className="nav-item">
                    <span className="nav-link text-success fw-bold">👋 {loggedUser.username}</span>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">👤 Profile</Link>
                  </li>
                  <li className="nav-item position-relative">
                      <Link to="/cart" className="nav-link">🛒 Cart ({cartCount})</Link>
                    </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-outline-light" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
