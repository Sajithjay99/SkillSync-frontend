import React from "react";
import Contacts from "./Contacts";

const RightSection = () => {
  return (
    <div
      style={{
        width: "20%",
        height: "92vh",
        overflow: "hidden",
        overflowY: "auto",
        background: "#FFFFFF",
        padding: "20px 16px",
        color: "#333",
        position: "fixed",
        right: 0,
        borderLeft: "1px solid #e0e0e0",
        boxShadow: "-2px 0 10px rgba(0,0,0,0.03)"
      }}
    ></div>
    <div>
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px"
          }}
        >
          <h2 
            style={{
              fontSize: "16px",
              color: "#555",
              fontWeight: "600",
              margin: "0"
            }}
          >
            Your Pages and profiles
          </h2>
          <div 
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
            className="menu-button"
          >
            <i 
              className="fa-solid fa-ellipsis"
              style={{ fontSize: "16px", color: "#666" }}
            ></i>
          </div>
        </div>