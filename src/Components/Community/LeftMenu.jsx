import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const LeftMenu = () => {
  const snap = useSnapshot(state);
  
  const handleClick = (index) => {
    state.activeIndex = index;
  };
  
  // Main navigation items
  const mainNavItems = [
    "Posts",
    "Skill Plans",
    "Learning Tracking",
    "Friends",
    "Notifications",
  ];
  
  // Shortcut items
  const shortcutItems = [
    "Gallery",
    "Videos"
  ];
  return (
    <div className="left-menu">
      <div className="left-menu-header">
      <img src="../assets/icon.png" alt="" />
        <h3 className="left-menu-title">DevConnect</h3>
      </div>
      
      {/* Main navigation */}
      <ul className="left-menu-list">
        {mainNavItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`left-menu-item ${snap.activeIndex === index + 1 ? "active" : ""}`}
          >
            <a href="#" className="left-menu-link">
              {item}
            </a>
            {snap.activeIndex === index + 1 && (
              <div className="left-menu-active-indicator" />
            )}
          </li>
        ))}
      </ul>
      
