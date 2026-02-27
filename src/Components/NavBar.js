import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ books, setFilteredBooks }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredBooks(filtered);
    navigate("/"); // redirects to homepage after search
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        📚 Library
      </Link>

      <input
  type="text"
  placeholder="Search..."
  className="form-control w-25 ms-3"
/>
      <div className="ms-auto d-flex">
        <input
          type="text"
          placeholder="Search books..."
          className="form-control me-2"
          value={search}
          onChange={handleSearch}
        />
        <Link to="/cart" className="btn btn-warning">
          Cart
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;