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
