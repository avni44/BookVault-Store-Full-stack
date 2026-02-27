// import React, { useState, useEffect } from "react";

// function PaymentPage() {

//   const [totalAmount, setTotalAmount] = useState(0);
//   const [address, setAddress] = useState("");

//   useEffect(() => {

//     // ⭐ Recalculate from cart
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const total = cart.reduce((sum, item) => {
//       return sum + item.price * item.quantity;
//     }, 0);

//     setTotalAmount(total);

//     // ⭐ Get address
//     const savedAddress = localStorage.getItem("deliveryAddress");
//     if (savedAddress) setAddress(savedAddress);

//   }, []);

//   const handlePayment = () => {

//     if (totalAmount === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     const options = {
//       key: "rzp_test_SKExkiU5BtUHnQ",
//       amount: totalAmount * 100,
//       currency: "INR",
//       name: "BookVault Store",
//       description: "Book Purchase",

//       handler: function () {
//         alert("Payment Successful ✅");
//         localStorage.removeItem("cart");
//       },

//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "40px" }}>
//       <h2>Payment Page</h2>

//       <h3>Total Amount to Pay: ₹{totalAmount}</h3>

//       <h4>Delivery Address</h4>
//       <p>{address}</p>

//       <br />

//       <button onClick={handlePayment}>
//         Pay Now
//       </button>
//     </div>
//   );
// }

// export default PaymentPage;

















// import React, { useState } from "react";

// function PaymentPage() {

//   const [address, setAddress] = useState("");

//   const totalAmount = 500; // ₹500 (replace with cart total)

//   const handlePayment = () => {

//     if (!address) {
//       alert("Please enter delivery address");
//       return;
//     }

//     const options = {
//       key: "rzp_test_SKExkiU5BtUHnQ",
//       amount: totalAmount * 100, // convert to paise
//       currency: "INR",
//       name: "BookVault Store",
//       description: "Book Purchase",

//       handler: function (response) {
//         alert("Payment Successful ✅");
//         console.log(response);

//         // ⭐ optional: clear cart after payment
//         localStorage.removeItem("cart");
//       },

//       prefill: {
//         name: "Avanti",
//         email: "test@example.com",
//         contact: "9999999999",
//       },

//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
      
//       <h2>Checkout</h2>

//       <h3>Total Amount: ₹{totalAmount}</h3>

//       <textarea
//         placeholder="Enter Delivery Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         style={{ width: "300px", height: "100px" }}
//       />

//       <br /><br />

//       <button onClick={handlePayment}>
//         Confirm & Pay Now
//       </button>

//     </div>
//   );
// }

// export default PaymentPage;


















// import React from "react";

// function PaymentPage() {

//   const handlePayment = () => {

//     const options = {
//       key: "rzp_test_SKExkiU5BtUHnQ", // 🔴 paste your Test Key ID here
//       amount: 50000, // amount in paise = ₹500
//       currency: "INR",
//       name: "BookVault Store",
//       description: "Test Transaction",
//       handler: function (response) {
//         alert("Payment Successful ✅");
//         console.log(response);
//       },
//       prefill: {
//         name: "Avanti",
//         email: "test@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   return (
//     <div>
//       <h2>Payment Page</h2>
//       <button onClick={handlePayment}>
//         Proceed to pay
//       </button>
//     </div>
//   );
// }

// export default PaymentPage;