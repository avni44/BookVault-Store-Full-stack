import React, { useState } from "react";

function ProfilePage() {

  const [address, setAddress] = useState("");

  const handleSave = () => {
    localStorage.setItem("userAddress", address);
    alert("Address Saved");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Profile</h2>

      <textarea
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSave}>Save Address</button>
    </div>
  );
}

export default ProfilePage;


























// import React, { useState, useContext, useEffect } from 'react';
// import { UserContext } from "../UserContext";
// import axios from "axios";

// const Profile = () => {
//   const { loggedUser, setLoggedUser } = useContext(UserContext);
//   const [address, setAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: ""
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Load saved address from localStorage
//   useEffect(() => {
//     if (loggedUser) {
//       const savedAddress = localStorage.getItem(`address_${loggedUser.id || loggedUser.username}`);
//       if (savedAddress) {
//         setAddress(JSON.parse(savedAddress));
//       }
//     }
//   }, [loggedUser]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress({ ...address, [name]: value });
//   };

//   const saveAddress = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Save to localStorage
//       localStorage.setItem(`address_${loggedUser.id || loggedUser.username}`, JSON.stringify(address));
      
//       // Optional: Save to backend
//       // await axios.post("http://localhost:8080/save-address", { userId: loggedUser.id, ...address });
      
//       alert("Address saved successfully!");
//       setEditMode(false);
//     } catch (error) {
//       alert("Failed to save address.");
//     }
//     setLoading(false);
//   };

//   if (!loggedUser) {
//     return (
//       <div className="container my-5 text-center">
//         <h2>Please <a href="/login">login</a> to view profile</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5 py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-8">
//           {/* Profile Header */}
//           <div className="card shadow-lg border-0 rounded-4 mb-5 overflow-hidden">
//             <div className="card-body p-5 text-center bg-gradient">
//               <div className="profile-avatar mb-4 mx-auto rounded-circle shadow-lg d-flex align-items-center justify-content-center" 
//                    style={{ width: "120px", height: "120px", background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
//                 <span className="display-4 fw-bold text-white">👤</span>
//               </div>
//               <h1 className="display-5 fw-bold text-white mb-2">{loggedUser.username}</h1>
//               <p className="lead text-white-50 mb-0">Welcome back!</p>
//             </div>
//           </div>

//           {/* Address Section */}
//           <div className="card shadow-lg border-0 rounded-4">
//             <div className="card-header bg-light border-0 py-4">
//               <div className="d-flex justify-content-between align-items-center">
//                 <h3 className="mb-0 fw-bold text-dark">
//                   📍 Delivery Address
//                 </h3>
//                 <button 
//                   className="btn btn-outline-primary fw-bold px-4 py-2"
//                   onClick={() => setEditMode(!editMode)}
//                   disabled={loading}
//                 >
//                   {editMode ? "Cancel" : "Edit Address"}
//                 </button>
//               </div>
//             </div>

//             <div className="card-body p-5">
//               {editMode ? (
//                 /* Edit Form */
//                 <form onSubmit={saveAddress}>
//                   <div className="row g-4">
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">Street Address</label>
//                       <input 
//                         type="text" 
//                         className="form-control shadow-sm" 
//                         name="street" 
//                         value={address.street}
//                         onChange={handleInputChange}
//                         required 
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">Phone Number</label>
//                       <input 
//                         type="tel" 
//                         className="form-control shadow-sm" 
//                         name="phone" 
//                         value={address.phone}
//                         onChange={handleInputChange}
//                         required 
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="form-label fw-bold">City</label>
//                       <input 
//                         type="text" 
//                         className="form-control shadow-sm" 
//                         name="city" 
//                         value={address.city}
//                         onChange={handleInputChange}
//                         required 
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="form-label fw-bold">State</label>
//                       <input 
//                         type="text" 
//                         className="form-control shadow-sm" 
//                         name="state" 
//                         value={address.state}
//                         onChange={handleInputChange}
//                         required 
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="form-label fw-bold">Pincode</label>
//                       <input 
//                         type="number" 
//                         className="form-control shadow-sm" 
//                         name="pincode" 
//                         value={address.pincode}
//                         onChange={handleInputChange}
//                         required 
//                       />
//                     </div>
//                   </div>
//                   <div className="d-grid gap-3 mt-5">
//                     <button 
//                       type="submit" 
//                       className="btn btn-success btn-lg fw-bold py-3 shadow-sm"
//                       disabled={loading}
//                     >
//                       {loading ? "Saving..." : "💾 Save Address"}
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 /* View Mode */
//                 <div className="address-display">
//                   {address.street ? (
//                     <>
//                       <div className="row g-3 mb-4">
//                         <div className="col-md-8">
//                           <h5 className="fw-bold text-primary mb-2">📍 Saved Address</h5>
//                           <div className="address-details">
//                             <p className="mb-2 fs-5">{address.street}</p>
//                             <p className="mb-1">{address.city}, {address.state}</p>
//                             <p className="mb-3">{address.pincode}</p>
//                             <p className="text-muted mb-0">
//                               📞 {address.phone}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="col-md-4 text-center">
//                           <div className="badge bg-success fs-5 px-4 py-3 w-100 h-100 d-flex align-items-center justify-content-center">
//                             ✅ Ready for Delivery
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="text-center py-5">
//                       <div className="display-1 text-muted mb-4">📍</div>
//                       <h4 className="text-muted mb-4">No address saved</h4>
//                       <p className="text-muted mb-5">Add your delivery address to start shopping</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
