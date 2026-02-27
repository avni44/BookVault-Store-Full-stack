import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <section className="carousel-section py-5 bg-light">
        <div className="container">
          <h3 className="text-center mb-4">Featured Books</h3>
          <div id="bookCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://jamesclear.com/wp-content/uploads/2020/11/atomic-habits_gallery_hi-res_01.jpg" className="d-block w-100 carousel-img" alt="Book 1" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Popular Reads</h5>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://miro.medium.com/1*V9voCsgFNYLvzMy5kHPlrw.jpeg" className="d-block w-100 carousel-img" alt="Book 2" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>New Arrivals</h5>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjim3P82bUH3yx6lNdJGqSvSC3POytdsyKoQ&s" className="d-block w-100 carousel-img" alt="Book 3" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Bestsellers</h5>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#bookCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#bookCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </section>

      <section className="options-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Quick Actions</h2>
          <div className="row g-4 text-center">
            <div className="col-md-6">
              <Link to="/book-list" className="option-card h-100 text-decoration-none">
                <div className="card h-100 shadow border-0">
                  <div className="card-body">
                    <i className="fas fa-book-open text-success mb-3" style={{fontSize: '3rem'}}></i>
                    <h4>Browse Books</h4>
                    <p className="text-muted">View all available books</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to="/filter-book" className="option-card h-100 text-decoration-none">
                <div className="card h-100 shadow border-0">
                  <div className="card-body">
                    <i className="fas fa-filter text-warning mb-3" style={{fontSize: '3rem'}}></i>
                    <h4>Filter Books</h4>
                    <p className="text-muted">Search and filter books</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
