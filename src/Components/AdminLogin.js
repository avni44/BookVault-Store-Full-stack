import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Admin Login
    if (credentials.username === "admin" && credentials.password === "admin123") {
      const adminUser = { id: 1, username: "admin", role: "ADMIN" };
      setLoggedUser(adminUser);
      localStorage.setItem("loggedUser", JSON.stringify(adminUser));
      alert("✅ Admin login successful!");
      navigate("/admin");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/logins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        const userData = await response.json();
        const isAdminUser = userData.username === "admin" || userData.role === "ADMIN";
        if (isAdminUser) {
          setLoggedUser(userData);
          localStorage.setItem("loggedUser", JSON.stringify(userData));
          alert("✅ Admin login successful!");
          navigate("/admin");
        } else {
          setError("❌ Admin access required!");
        }
      }
    } catch (error) {
      setError("❌ Use demo: admin/admin123");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="admin-login-container min-vh-100 d-flex align-items-center justify-content-center py-5 px-3">
    <div className="row justify-content-center w-100">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 admin-login-small mx-auto">
        <div className="card admin-login-card h-7/0">
          <div className="card-header admin-login-header text-center position-relative p-3">
            <h2 className="display-7 fw-bold mb-3">Admin Portal</h2>
            <p className="lead opacity-90 mb-0">Secure Dashboard Access</p>
            <small className="d-block mt-2 text-white-50">Demo: admin / admin123</small>
          </div>
          
          <div className="card-body p-5 admin-login-form">
            {error && (
              <div className="alert alert-warning shadow-sm mb-4">
                <i className="fas fa-info-circle me-2"></i>{error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold fs-6 mb-3 text-dark">
                  👤 Admin Username
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg shadow-sm"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  placeholder="admin"
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label fw-bold fs-6 mb-3 text-dark">
                  🔒 Admin Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg shadow-sm"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="admin123"
                  disabled={loading}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-warning w-100 admin-login-btn fs-5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing in...
                  </>
                ) : (
                  "Enter Admin Portal"
                )}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <Link to="/login" className="btn btn-outline-secondary btn-lg w-100">
                👤 Customer Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
export default AdminLogin;



















// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { UserContext } from "../UserContext";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const { setLoggedUser } = useContext(UserContext);
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // ✅ ADMIN BYPASS - Works even if backend fails!
//     if (credentials.username === "admin" && credentials.password === "admin123") {
//       const adminUser = {
//         id: 1,
//         username: "admin",
//         role: "ADMIN"
//       };
      
//       setLoggedUser(adminUser);
//       localStorage.setItem("loggedUser", JSON.stringify(adminUser));
//       alert("✅ Admin login successful! 👑");
//       navigate("/admin");
//       return;
//     }

//     // Try backend as fallback
//     try {
//       const response = await fetch("http://localhost:8080/logins", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials)
//       });
      
//       if (response.ok) {
//         const userData = await response.json();
//         const isAdminUser = userData.username === "admin" || userData.role === "ADMIN";
        
//         if (isAdminUser) {
//           setLoggedUser(userData);
//           localStorage.setItem("loggedUser", JSON.stringify(userData));
//           alert("✅ Admin login successful!");
//           navigate("/admin");
//         } else {
//           setError("❌ Admin access required!");
//         }
//       } else {
//         setError("❌ Server error. Use demo: admin/admin123");
//       }
//     } catch (error) {
//       setError("❌ Backend unavailable. Use demo: admin/admin123");
//       console.log("Backend failed, demo mode active");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container my-5 py-5 d-flex align-items-center min-vh-100 bg-light">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-5">
//           <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
//             <div className="card-header bg-warning text-dark text-center py-4">
//               <div className="mx-auto rounded-circle bg-light d-flex align-items-center justify-content-center mb-3 shadow-lg" 
//                    style={{ width: "80px", height: "80px" }}>
//                 <span className="fs-1 fw-bold">👑</span>
//               </div>
//               <h2 className="mb-0 fw-bold">Admin Portal</h2>
//               <small className="text-muted">Demo: admin / admin123</small>
//             </div>
//             <div className="card-body p-5">
//               {error && (
//                 <div className="alert alert-warning shadow-sm mb-4">
//                   <i className="fas fa-info-circle me-2"></i>
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="form-label fw-bold mb-2">👤 Username</label>
//                   <input
//                     type="text"
//                     className="form-control form-control-lg shadow-sm"
//                     name="username"
//                     value={credentials.username}
//                     onChange={handleInputChange}
//                     placeholder="admin"
//                     disabled={loading}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="form-label fw-bold mb-2">🔒 Password</label>
//                   <input
//                     type="password"
//                     className="form-control form-control-lg shadow-sm"
//                     name="password"
//                     value={credentials.password}
//                     onChange={handleInputChange}
//                     placeholder="admin123"
//                     disabled={loading}
//                     required
//                   />
//                 </div>
//                 <button 
//                   type="submit" 
//                   className="btn btn-warning w-100 btn-lg fw-bold py-3 shadow-lg fs-5"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2"></span>
//                       Signing in...
//                     </>
//                   ) : (
//                     "👑 Enter Admin Portal"
//                   )}
//                 </button>
//               </form>

//               <div className="text-center mt-4 pt-3 border-top">
//                 <Link to="/login" className="btn btn-outline-secondary btn-lg w-100">
//                   👤 Customer Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
