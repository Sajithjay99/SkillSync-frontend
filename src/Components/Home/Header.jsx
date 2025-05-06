import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AuthModal from "../Modals/AuthModal";
import AuthService from "../../Services/AuthService";
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isAuthenticated = AuthService.isAuthenticated();
      setIsLoggedIn(isAuthenticated);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("focus", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("focus", checkLoginStatus);
    };
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const authButtonClicked = () => {
    if (isLoggedIn) {
      navigate("/community");
    } else {
      setIsAuthModalOpened(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpened(false);
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <header className={`header ${isLoggedIn ? "header--logged-in" : ""}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#f0faff" },
          fpsLimit: 30,
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#3D90D7" },
            shape: { type: "circle" },
            opacity: { value: 0.4 },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outMode: "bounce",
            },
            links: {
              enable: true,
              distance: 150,
              color: "#9cdcff",
              opacity: 0.3,
              width: 1,
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <Navbar />

      <div className="sectioncontainer">
        <div className="headercontainer" style={{ position: "relative", zIndex: 1 }}>
          <div className="headercontent">
            <h1>Developer Connect</h1>
            <h2>CODE. COLLABORATE. INNOVATE.</h2>
            <p>
              Join our community of passionate developers and tech professionals.
              Share your projects, learn from experts, find collaborators,
              and accelerate your growth in the tech industry.
            </p>
            <div className="headerbtn">
              <button className="btn btnprimary" onClick={authButtonClicked}>
                {isLoggedIn ? "Go to Dashboard" : "Join the Community"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        onClose={() => setIsAuthModalOpened(false)}
        onSuccess={handleAuthSuccess}
        isOpen={isAuthModalOpened}
      />
    </header>
  );
};

export default Header;
