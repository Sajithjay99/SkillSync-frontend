import React from "react";
import "../../Styles/navbar.css";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import NotificationsDropdown from "./NotificationsDropdown";
const Navbar = () => {
  const snap = useSnapshot(state);
  const currentUser = snap.currentUser;