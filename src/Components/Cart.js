import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartCount } =
    useContext(UserContext);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Razorpay Payment Function
  const handleCheckout = () => {
  if (cartItems.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const options = {
    key: "rzp_test_SKExkiU5BtUHnQ",
    amount: totalPrice * 100,
    currency: "INR",
    name: "BookVault Store",
    description: "Book Purchase",

    handler: function (response) {
      alert("Payment Successful 🎉");

      clearCart(); // ⭐ EMPTY CART AFTER PAYMENT

      navigate("/order-success"); // ⭐ GO TO SUCCESS PAGE
    },

    prefill: {
      name: "Avni",
      email: "test@example.com",
      contact: "9999999999",
    },

    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  // 🛒 Empty cart UI
  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/book-list" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">🛒 Shopping Cart</h1>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 p-3 shadow-sm">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-fluid rounded"
                    style={{ height: "120px", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-4">
                  <h5>{item.name}</h5>
                  <p>₹{item.price}</p>
                </div>

                <div className="col-md-2">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span className="mx-2">{item.quantity}</span>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="col-md-2 text-end">
                  <h6>₹{item.price * item.quantity}</h6>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card p-4 shadow">
            <h4>Order Summary</h4>
            <p>Total Items: {cartCount}</p>
            <h3>Total: ₹{totalPrice}</h3>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handleCheckout}
            >
              Proceed to Checkout 💳
            </button>

            <button
              className="btn btn-outline-danger w-100 mt-2"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
















// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from "../UserContext";

// const Cart = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart, cartCount } = useContext(UserContext);
//   const navigate = useNavigate();

//   const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   const handleCheckout = () => {
//   if (cartItems.length === 0) {
//     alert("Cart is empty!");
//     return;
//   }

//   navigate("/payment", { state: { total: totalPrice } });
// };

//   if (cartItems.length === 0) {
//     return (
//       <div className="container my-5 py-5 text-center">
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             <div className="empty-cart shadow-lg p-5 rounded-4">
//               <div className="mb-4">
//                 <i className="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
//               </div>
//               <h2 className="display-5 fw-bold text-muted mb-4">Your cart is empty</h2>
//               <p className="lead text-muted mb-5">Looks like you haven't added any books yet.</p>
//               <Link to="/book-list" className="btn btn-primary btn-lg px-5">
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5 py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="d-flex justify-content-between align-items-center mb-5">
//             <h1 className="display-6 fw-bold">🛒 Shopping Cart</h1>
//             <div className="text-end">
//               <h3 className="text-primary">Total Items: <span className="badge bg-primary fs-5">{cartCount}</span></h3>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-lg-8">
//               <div className="card shadow-lg border-0 mb-5">
//                 <div className="card-body p-5">
//                   {cartItems.map((item) => (
//                     <div key={item.id} className="row align-items-center py-4 border-bottom">
//                       <div className="col-md-3">
//                         <img 
//                           src={item.imageUrl || "https://via.placeholder.com/150x200?text=No+Image"} 
//                           alt={item.name} 
//                           className="img-fluid rounded-3 shadow-sm" 
//                           style={{height: "120px", objectFit: "cover"}}
//                         />
//                       </div>
//                       <div className="col-md-5">
//                         <h5 className="fw-bold mb-2">{item.name}</h5>
//                         <p className="mb-2"><strong>₹{item.price}</strong></p>
//                         <p className="text-muted mb-0">{item.author} | {item.category}</p>
//                       </div>
//                       <div className="col-md-2">
//                         <div className="input-group quantity-input">
//                           <button 
//                             className="btn btn-outline-secondary" 
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           >
//                             -
//                           </button>
//                           <input 
//                             type="number" 
//                             className="form-control text-center fw-bold" 
//                             value={item.quantity}
//                             min="0"
//                             style={{width: "80px"}}
//                           />
//                           <button 
//                             className="btn btn-outline-secondary" 
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                       <div className="col-md-2 text-end">
//                         <h5 className="fw-bold text-danger">₹{(item.price * item.quantity).toFixed(2)}</h5>
//                         <button 
//                           className="btn btn-outline-danger btn-sm mt-2"
//                           onClick={() => removeFromCart(item.id)}
//                         >
//                           <i className="fas fa-trash"></i> Remove
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-4">
//               <div className="card shadow-lg border-0 sticky-top" style={{top: "20px"}}>
//                 <div className="card-body p-5">
//                   <h4 className="fw-bold mb-4">Order Summary</h4>
//                   <div className="d-flex justify-content-between mb-3">
//                     <span>Subtotal ({cartCount} items):</span>
//                     <span>₹{totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="d-flex justify-content-between mb-4 pb-3 border-bottom">
//                     <span className="fw-bold fs-5">Total:</span>
//                     <span className="fw-bold fs-4 text-danger">₹{totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="d-grid gap-3">
//                     <button 
//                       className="btn btn-success btn-lg fw-bold py-1 fs-6"
//                       onClick={handleCheckout}
//                     >
//                       Proceed to Checkout 💳
//                     </button>
//                     <Link to="/book-list" className="btn btn-outline-primary btn-lg py-1">
//                       Continue Shopping
//                     </Link>
//                     <button 
//                       className="btn btn-outline-danger btn-lg py-1"
//                       onClick={clearCart}
//                     >
//                       Clear Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
