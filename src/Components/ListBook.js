import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../UserContext";
import FilterBook from "./FilterBook";


export const ListBook = () => {
  const [book, setBook] = useState([]);
  const [search, setSearch] = useState(""); // ✅ SEARCH STATE ADDED
  const [editingBook, setEditingBook] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, bookId: null });
  const { loggedUser, isAdmin, addToCart } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllBooks");
      setBook(response.data);
    } catch (error) {
      console.error("error fetching data");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ show: true, bookId: id });
  };

  const confirmDelete = async () => {
    if (deleteConfirm.bookId) {
      try {
        await axios.delete(`http://localhost:8080/deleteBook/${deleteConfirm.bookId}`);
        fetchBooks();
        alert("✅ Book deleted successfully!");
      } catch (error) {
        console.error("error deleting data");
        alert("❌ Failed to delete book.");
      }
    }
    setDeleteConfirm({ show: false, bookId: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, bookId: null });
  };

  const handleUpdateClick = (bookItem) => {
    setEditingBook(bookItem);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/updateBook/${editingBook.id}`, editingBook);
      setShowUpdateModal(false);
      setEditingBook({});
      fetchBooks();
      alert("✅ Book updated successfully!");
    } catch (error) {
      console.error("error updating data");
      alert("❌ Failed to update book.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBook({ ...editingBook, [name]: name === 'price' ? Number(value) : value });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    const btn = document.querySelector(`button[data-book-id="${item.id}"]`);
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ Added!';
      btn.classList.add('btn-success');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('btn-success');
      }, 1500);
    }
  };

  const handleBuyNow = (item) => {
    navigate("/payment", { state: { book: item } });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowUpdateModal(false);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="display-6 fw-bold text-primary">📚 Book Catalog</h1>
          {isAdmin && (
            <span className="badge bg-danger fs-5 px-4 py-3 fw-bold shadow">
              👑 ADMIN MODE - Delete/Update Active
            </span>
          )}
        </div>

        {/* ✅ SEARCH BAR */}
        <div className="row mb-4">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="🔍 Search book by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-3">
    <Link to="/filter-book" className="text-decoration-none">
      <button className="btn btn-warning btn-lg w-100">
        <i className="fas fa-filter me-2"></i>
        Filter Books
      </button>
    </Link>
  </div>

        {/* <div className="col-md-6">
                      <Link to="/filter-book" className="option-card h-100 text-decoration-none">
                        <div className="card h-100 shadow border-0">
                          <div className="card-body">
                            <i className="fas fa-filter text-warning mb-3" style={{fontSize: '3rem'}}></i>
                            <h4>Filter Books</h4>
                            <p className="text-muted">Search and filter books</p>
                          </div>
                        </div>
                      </Link>
                    </div> */}

        <div className="row g-4">
          {book
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden position-relative">

                  {isAdmin && (
                    <div className="position-absolute top-3 end-3 p-2 z-3 bg-white rounded-4 shadow-lg">
                      <button 
                        className="btn btn-sm btn-outline-primary me-2 rounded-pill px-3 py-1" 
                        onClick={() => handleUpdateClick(item)}
                      >
                        Update
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1" 
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  <div className="card-img-top p-4 bg-light">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="img-fluid rounded-3 shadow w-100" 
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center text-muted rounded-3" 
                           style={{ height: "220px" }}>
                        📖 {item.name}
                      </div>
                    )}
                  </div>

                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-3">{item.name}</h5>
                    <small className="fw-semibold text-success d-block mb-2">
                      👨‍🎨 {item.author}
                    </small>

                    <div className="text-center py-1 bg-light rounded-3 mb-4">
                      <h3 className="text-danger fw-bold">₹ {item.price}</h3>
                    </div>

                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-success btn-lg fw-bold py-2"
                        data-book-id={item.id}
                        onClick={() => handleAddToCart(item)}
                      >
                        🛒 Add to Cart
                      </button>
                      <button 
                        className="btn btn-warning btn-lg fw-bold py-2 text-white"
                        onClick={() => handleBuyNow(item)}
                      >
                        💳 Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {book.length === 0 && (
          <div className="text-center py-5 my-5">
            <h3 className="text-muted mb-4">No books available</h3>
            <Link to="/add-book" className="btn btn-primary btn-lg px-5">
              ➕ Add First Book
            </Link>
          </div>
        )}
      </div>

      {deleteConfirm.show && (
        <div 
          className="modal fade show" 
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }} 
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-danger text-white border-0">
                <h5 className="modal-title mb-0">🗑️ Delete Book</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={cancelDelete}
                />
              </div>
              <div className="modal-body text-center py-5">
                <div className="mb-4">
                  <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3 d-block"></i>
                  <h4 className="fw-bold text-danger">Are you sure?</h4>
                </div>
                <p className="lead text-muted mb-5">
                  This action cannot be undone. This book will be permanently deleted.
                </p>
              </div>
              <div className="modal-footer border-0 justify-content-center gap-3 p-4">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary px-4 py-2 fw-bold"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger px-4 py-2 fw-bold shadow-sm"
                  onClick={confirmDelete}
                >
                  Delete Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};




















// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from "axios";
// import { UserContext } from "../UserContext";

// export const ListBook = () => {
//   const [book, setBook] = useState([]);
//   const [editingBook, setEditingBook] = useState({});
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   // ✅ NEW: Delete confirmation state
//   const [deleteConfirm, setDeleteConfirm] = useState({ show: false, bookId: null });
//   const { loggedUser, addToCart } = useContext(UserContext);
//   const navigate = useNavigate();

//   const fetchBooks = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/getAllBooks");
//       setBook(response.data);
//     } catch (error) {
//       console.error("error fetching data");
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   // ✅ FIXED: Custom delete confirmation
//   const handleDeleteClick = (id) => {
//     setDeleteConfirm({ show: true, bookId: id });
//   };

//   const confirmDelete = async () => {
//     if (deleteConfirm.bookId) {
//       try {
//         await axios.delete(`http://localhost:8080/deleteBook/${deleteConfirm.bookId}`);
//         fetchBooks();
//         alert("Book deleted successfully!");
//       } catch (error) {
//         console.error("error deleting data");
//         alert("Failed to delete book.");
//       }
//     }
//     setDeleteConfirm({ show: false, bookId: null });
//   };

//   const cancelDelete = () => {
//     setDeleteConfirm({ show: false, bookId: null });
//   };

//   const handleUpdateClick = (bookItem) => {
//     setEditingBook(bookItem);
//     setShowUpdateModal(true);
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:8080/updateBook/${editingBook.id}`, editingBook);
//       setShowUpdateModal(false);
//       setEditingBook({});
//       fetchBooks();
//       alert("Book updated successfully!");
//     } catch (error) {
//       console.error("error updating data");
//       alert("Failed to update book.");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingBook({ ...editingBook, [name]: name === 'price' ? Number(value) : value });
//   };

//   const handleAddToCart = (item) => {
//     addToCart(item);
//     const btn = document.querySelector(`button[data-book-id="${item.id}"]`);
//     if (btn) {
//       const originalText = btn.innerHTML;
//       btn.innerHTML = '✅ Added!';
//       btn.classList.add('btn-success');
//       setTimeout(() => {
//         btn.innerHTML = originalText;
//         btn.classList.remove('btn-success');
//       }, 1500);
//     }
//   };

//   const handleBuyNow = (item) => {
//     navigate("/payment", { state: { book: item } });
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       setShowUpdateModal(false);
//     }
//   };

//   return (
//     <>
//       <div className="container my-5">
//         <div className="d-flex justify-content-between align-items-center mb-5">
//           <h1 className="display-4 fw-bold text-primary">📚 Book Catalog</h1>
//           {loggedUser && (
//             <span className="badge bg-success fs-6 px-3 py-2">
//               👨‍💼 Admin Mode
//             </span>
//           )}
//         </div>

//         <div className="row g-4">
//           {book.map((item) => (
//             <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
//               <div className="card h-100 shadow border-0 rounded-4 overflow-hidden position-relative">
//                 {/* Admin Actions - Top Right Corner */}
//                 {loggedUser && (
//                   <div className="position-absolute top-2 end-2 p-2 z-3">
//                     <button 
//                       className="btn btn-sm btn-outline-primary me-1 rounded-pill" 
//                       onClick={() => handleUpdateClick(item)}
//                       title="Update"
//                     >
//                       ✏️
//                     </button>
//                     <button 
//                       className="btn btn-sm btn-outline-danger rounded-pill" 
//                       onClick={() => handleDeleteClick(item.id)}
//                       title="Delete"
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 )}

//                 <div className="card-img-top p-4 bg-light">
//                   {item.imageUrl ? (
//                     <img 
//                       src={item.imageUrl} 
//                       alt={item.name} 
//                       className="img-fluid rounded-3 shadow w-100" 
//                       style={{ height: "220px", objectFit: "cover" }}
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                         e.target.nextSibling.style.display = 'flex';
//                       }}
//                     />
//                   ) : (
//                     <div className="d-flex align-items-center justify-content-center text-muted bg-gradient rounded-3" 
//                          style={{ height: "220px", fontSize: "1.2rem" }}>
//                       📖 {item.name}
//                     </div>
//                   )}
//                 </div>

//                 <div className="card-body p-4">
//                   <h5 className="card-title fw-bold mb-3 lh-sm">{item.name}</h5>
                  
//                   <div className="mb-3">
//                     <small className="fw-semibold text-success d-block mb-1">👨‍🎨 {item.author}</small>
//                     <span className="badge bg-info text-dark px-2 py-1 fw-medium">{item.category}</span>
//                   </div>

//                   <div className="text-center py-3 bg-light rounded-3 mb-4">
//                     <h3 className="text-danger fw-bold mb-1">₹ {item.price}</h3>
//                     <small className="text-muted">Inclusive of all taxes</small>
//                   </div>

//                   <div className="d-grid gap-2">
//                     <button 
//                       className="btn btn-success btn-lg fw-bold py-3 shadow-sm" 
//                       data-book-id={item.id}
//                       onClick={() => handleAddToCart(item)}
//                     >
//                       🛒 Add to Cart
//                     </button>
//                     <button 
//                       className="btn btn-warning btn-lg fw-bold py-3 text-white shadow-sm" 
//                       onClick={() => handleBuyNow(item)}
//                     >
//                       💳 Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {book.length === 0 && (
//           <div className="text-center py-5 my-5">
//             <div className="display-1 text-muted mb-4">📚</div>
//             <h3 className="text-muted mb-4">No books available</h3>
//             <Link to="/add-book" className="btn btn-primary btn-lg px-5">
//               ➕ Add First Book
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* ✅ Update Modal */}
//       {showUpdateModal && (
//         <div 
//           className="modal fade show" 
//           style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} 
//           tabIndex="-1"
//           onClick={handleBackdropClick}
//         >
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className="modal-content rounded-4 shadow-lg border-0">
//               <div className="modal-header border-0 pb-3">
//                 <h3 className="modal-title fw-bold text-primary mb-0">✏️ Update Book</h3>
//                 <button 
//                   type="button" 
//                   className="btn-close btn-close-white" 
//                   onClick={() => setShowUpdateModal(false)}
//                 />
//               </div>
//               <div className="modal-body p-4">
//                 <form onSubmit={handleUpdateSubmit}>
//                   <div className="row g-3">
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Book Name</label>
//                       <input type="text" className="form-control shadow-sm" name="name" value={editingBook.name || ""} onChange={handleInputChange} required />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Author</label>
//                       <input type="text" className="form-control shadow-sm" name="author" value={editingBook.author || ""} onChange={handleInputChange} required />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Category</label>
//                       <input type="text" className="form-control shadow-sm" name="category" value={editingBook.category || ""} onChange={handleInputChange} required />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Price (₹)</label>
//                       <input type="number" className="form-control shadow-sm" name="price" value={editingBook.price || ""} onChange={handleInputChange} min="0" step="0.01" required />
//                     </div>
//                     <div className="col-12">
//                       <label className="form-label fw-semibold">Image URL (Optional)</label>
//                       <input type="url" className="form-control shadow-sm" name="imageUrl" value={editingBook.imageUrl || ""} onChange={handleInputChange} placeholder="https://example.com/book-cover.jpg" />
//                     </div>
//                   </div>
//                   <div className="d-flex gap-2 mt-4">
//                     <button type="submit" className="btn btn-primary btn-lg flex-fill fw-bold shadow-sm">💾 Save Changes</button>
//                     <button type="button" className="btn btn-outline-secondary btn-lg flex-fill fw-bold shadow-sm" onClick={() => setShowUpdateModal(false)}>Cancel</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ NEW: Delete Confirmation Modal */}
//       {deleteConfirm.show && (
//         <div 
//           className="modal fade show" 
//           style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }} 
//           tabIndex="-1"
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content border-0 shadow-lg">
//               <div className="modal-header bg-danger text-white border-0">
//                 <h5 className="modal-title mb-0">🗑️ Delete Book</h5>
//                 <button 
//                   type="button" 
//                   className="btn-close btn-close-white" 
//                   onClick={cancelDelete}
//                 />
//               </div>
//               <div className="modal-body text-center py-5">
//                 <div className="mb-4">
//                   <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3 d-block"></i>
//                   <h4 className="fw-bold text-danger">Are you sure?</h4>
//                 </div>
//                 <p className="lead text-muted mb-5">
//                   This action cannot be undone. This book will be permanently deleted.
//                 </p>
//               </div>
//               <div className="modal-footer border-0 justify-content-center gap-3 p-4">
//                 <button 
//                   type="button" 
//                   className="btn btn-outline-secondary px-4 py-2 fw-bold"
//                   onClick={cancelDelete}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-danger px-4 py-2 fw-bold shadow-sm"
//                   onClick={confirmDelete}
//                 >
//                   Delete Book
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
