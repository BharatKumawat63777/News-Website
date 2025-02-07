import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/newsSlice";
import { useNavigate } from "react-router-dom"; // ✅ Use React Router for navigation

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Get navigate function
  const { category } = useSelector((state) => state.news);

  const handleCategoryChange = (event, newCategory) => {
    event.preventDefault(); // ✅ Prevent page refresh
    dispatch(setCategory(newCategory)); // ✅ Update Redux store
    navigate(`/${newCategory}`); // ✅ Change URL without refresh
    console.log("categroy: ", category);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          NewsApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={(e) => handleCategoryChange(e, "general")}
              >
                General
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={(e) => handleCategoryChange(e, "business")}
              >
                Business
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={(e) => handleCategoryChange(e, "entertainment")}
              >
                Entertainment
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={(e) => handleCategoryChange(e, "health")}
              >
                Health
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={(e) => handleCategoryChange(e, "science")}
              >
                Science
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={(e) => handleCategoryChange(e, "sports")}
              >
                Sports
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={(e) => handleCategoryChange(e, "technology")}
              >
                Technology
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
