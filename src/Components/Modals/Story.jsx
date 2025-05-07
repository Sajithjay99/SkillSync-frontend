import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Upload, message, Spin, Avatar } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import UploadFileService from "../../Services/UploadFileService";
import WorkoutStoryService from "../../Services/WorkoutStoryService";

const uploadService = new UploadFileService();

const WorkoutStory = () => {
  const snap = useSnapshot(state);
  const userId = snap.currentUser?.id;
  const workoutStory = snap.selectedWorkoutStory;
  const [imageUploading, setImageUploading] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    form.setFieldsValue({
      title: workoutStory?.title,
      description: workoutStory?.description,
    });
    
    setUploadedImage(null);
    
    // Find the author of the workout story
    if (snap.users && workoutStory?.userId) {
      const storyAuthor = snap.users.find(user => user.id === workoutStory.userId);
      setAuthor(storyAuthor);
    }
  }, [workoutStory, snap.users, form]);

  const [updatedStory, setUpdatedStory] = useState({
    title: workoutStory?.title || "",
    image: workoutStory?.image || "",
    description: workoutStory?.description || "",
  });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await WorkoutStoryService.updateWorkoutStory(
        snap.selectedWorkoutStory.id,
        updatedStory
      );
      state.storyCards = await WorkoutStoryService.getAllWorkoutStories();
      state.workoutStoryOpen = false;
      message.success("Story updated successfully");
      form.resetFields();
    } catch (error) {
      message.error("Error while updating story");
    } finally {
      setLoading(false);
    }
  };