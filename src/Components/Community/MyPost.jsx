import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";


const MyPost = () => {
  const snap = useSnapshot(state);