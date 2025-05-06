import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import StoryCard from "./StoryCard";
import { PlusOutlined } from "@ant-design/icons";
import WorkoutStoryService from "../../Services/WorkoutStoryService";

const TopBox = () => {
  const snap = useSnapshot(state);