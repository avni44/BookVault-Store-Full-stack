import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export const AddBook = () => {
  const [book,setBook] = useState({
    name: "",
    author: "",
    category: "",
    price: "",
    imageUrl: ""
});

  const handleInputChange = (event) => {
  const { name, value } = event.target;

  setBook((prevBook) => ({
    ...prevBook,
    [name]: name === "price" ? Number(value) : value
  }));
};

  const saveBook = async (event) => {
  event.preventDefault();

  const bookToSend = {
    ...book,
    price: Number(book.price)  
  };

  try {
    await axios.post("http://localhost:8080/books", bookToSend);
    alert("Book added successfully!");
    setBook({ name: "", author: "", category: "", price: "", imageUrl:"" });
  } catch (error) {
    console.error(error);
    alert("Failed to add book.");
  }
};

return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Book</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded p-4 shadow bg-white">
          <form onSubmit={saveBook}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={book.name} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input type="text" className="form-control" name="author" value={book.author} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input type="text" className="form-control" name="category" value={book.category} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" className="form-control" name="price" value={book.price} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Book Image URL</label>
              <input type="text" className="form-control" placeholder="https://example.com/cover.jpg" name="imageUrl" value={book.imageUrl} onChange={handleInputChange} />
            </div>
            <div className="d-grid gap-2 d-md-block">
              <button type="submit" className="btn btn-primary me-2">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={() => setBook({ name: "", author: "", category: "", price: "", imageUrl: "" })}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};