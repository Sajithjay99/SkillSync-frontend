import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./navbar.css"; 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar__scrolled" : ""}`}>
      <div className="nav__container">
        <div className="nav__header">
          <div className="nav__logo">
            <img src="/assets/icon.png" alt="DevConnect Logo" />
            <Link to="/">
              <span className="logo__text">SkillSync</span>
            </Link>
          </div>

          <div className="nav__search">
            <form>
              <input type="text" placeholder="Search for developers, projects, skills..." />
              <button type="submit" className="search__button">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          <button className="nav__menu__btn" onClick={toggleMenu}>
            <div className={`menu__icon ${menuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        <ul className={`nav__links ${menuOpen ? "open" : ""}`}>
          <li className="nav__item">
            <Link to="/explore" className="nav__link">Explore</Link>
          </li>
          <li className="nav__item">
            <Link to="/projects" className="nav__link">Projects</Link>
          </li>
          <li className="nav__item">
            <Link to="/learning" className="nav__link">Learning</Link>
          </li>
          <li className="nav__item">
            <Link to="/events" className="nav__link">Events</Link>
          </li>
          <li className="nav__item nav__item--cta">
            {isLoggedIn ? (
              <Link to="/dashboard" className="nav__link nav__link--cta">Dashboard</Link>
            ) : (
              <Link to="/signup" className="nav__link nav__link--cta">Sign Up</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
