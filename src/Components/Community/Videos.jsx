import React, { useEffect, useState } from "react";
import { Empty, Spin, message } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import PostService from "../../Services/PostService";
// import "./Videos.css";

const Videos = () => {
  const snap = useSnapshot(state);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(false);