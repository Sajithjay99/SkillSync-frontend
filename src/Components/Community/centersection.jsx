import React, { useEffect, useState } from "react";
import { Avatar, Empty, Spin, message } from "antd";
import TobBox from "./TobBox";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import PostService from "../../Services/PostService";
import SkillPlanService from "../../Services/SkillPlanService";
import StateDebugger from "./StateDebugger";

// Components
import MyPost from "./MyPost";
import FriendsPost from "./FriendsPost";
import CreateSkillPlanBox from "./CreateSkillPlanBox";
import SkillPlanCard from "./SkillPlanCard";
import FriendsSection from "./FriendsSection";
import Notifications from "./Notifications";
import LearningDashboard from "./LearningDashboard";
import MyLearning from "./MyLearning";
import Gallery from "./Gallery";
import Videos from "./Videos";

const CenterSection = () => {
  const snap = useSnapshot(state);
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);