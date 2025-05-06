import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import StoryCard from "./StoryCard";
import { PlusOutlined } from "@ant-design/icons";
import WorkoutStoryService from "../../Services/WorkoutStoryService";

const TopBox = () => {
    const snap = useSnapshot(state);
  
    useEffect(() => {
      const fetchStories = async () => {
        try {
          const stories = await WorkoutStoryService.getAllWorkoutStories();
          state.storyCards = stories;
        } catch (error) {
          console.error("Error fetching workout stories:", error);
        }
      };
      fetchStories();
    }, []);
  
    // Only render TopBox when activeIndex is 1 (Posts section)
    if (snap.activeIndex !== 1) {
      return null;
    }