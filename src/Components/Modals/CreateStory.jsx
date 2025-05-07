import React, { useState } from "react";
import { Modal, Upload, Input, Button, DatePicker, message, Form, Spin } from "antd";
import { UploadOutlined, PictureOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import UploadFileService from "../../Services/UploadFileService";
import WorkoutStoryService from "../../Services/WorkoutStoryService";

const uploader = new UploadFileService();

const CreateStory = () => {
  const snap = useSnapshot(state);
  const [imageUploading, setImageUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCreateWorkoutStory = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      
      if (!image) {
        message.error("Please upload an image");
        return;
      }
      
      setLoading(true);
      const body = {
        title: values.title,
        description: values.description,
        timestamp: values.timestamp ? values.timestamp.toISOString() : new Date().toISOString(),
        image,
        userId: snap.currentUser?.id,
      };
      
      await WorkoutStoryService.createWorkoutStory(body);
      state.storyCards = await WorkoutStoryService.getAllWorkoutStories();
      message.success("Workout story created successfully");
      form.resetFields();
      setImage(null);
      state.createWorkoutStatusModalOpened = false;
    } catch (error) {
      if (error.errorFields) {
        // Form validation errors handled by Ant Design
        return;
      }
      message.error("Error creating workout story");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (info) => {
    if (info.file) {
      setImageUploading(true);
      try {
        const url = await uploader.uploadFile(
          info.fileList[0].originFileObj,
          "workoutStories"
        );
        setImage(url);
        message.success("Image uploaded successfully");
      } catch (error) {
        message.error("Failed to upload image");
      } finally {
        setImageUploading(false);
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setImage(null);
    state.createWorkoutStatusModalOpened = false;
  };