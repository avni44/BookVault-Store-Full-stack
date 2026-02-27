import React, { useState } from "react";
import axios from "axios";

export const FilterBook = () => {
  const [text, setText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const getBookWithText = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getBookWithText/${text}`
      );
      let books = response.data;

      if (sortOrder === "asc") {
        books.sort((a, b) => a.price - b.price);
      } else {
        books.sort((a, b) => b.price - a.price);
      }

      setFilteredBooks(books);
    } catch (error) {
      console.error("Error filtering books with text:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Filter Books</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group mb-3">
            <label htmlFor="text">Filter by Text:</label>
            <input
              type="text"
              className="form-control"
              id="text"
              value={text}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="sortOrder">Sort by Price:</label>
            <select
              className="form-control"
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <button className="btn btn-primary col-md-4 mb-3" onClick={getBookWithText}>
            Filter 
          </button>
        </div>
      </div>
      <br />
      <div className="row">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
