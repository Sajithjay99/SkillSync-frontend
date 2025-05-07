import axios from "axios";
import { BASE_URL } from "../constants";

class WorkoutStatusUpdateService {
  async createWorkoutStory(workoutStoryData) {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/workoutStatusUpdates`,
        workoutStoryData,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create workout story");
    }
  }

  async getWorkoutStoriesByUserId(userId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/workoutStatusUpdates/${userId}`,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to get workout stories");
    }
  }
