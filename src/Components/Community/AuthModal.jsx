import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Upload,
  message,
  Divider,
  Space,
} from "antd";
import {
  InboxOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import UploadFileService from "../../Services/UploadFileService";
import AuthService from "../../Services/AuthService";
import UserService from "../../Services/UserService";

const uploader = new UploadFileService();
const AuthModal = ({ isOpen, onClose, onSuccess }) => {
    const [signinFocused, setSigninFocused] = useState(true);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
  
    const toggleFocus = () => {
      setSigninFocused(!signinFocused);
    };
  
    const handleFormSubmit = async (values) => {
      try {
        setIsLoading(true);
        if (signinFocused) {
          const response = await AuthService.login(
            values.username,
            values.password
          );
          localStorage.setItem("userId", response.userId);
          localStorage.setItem("accessToken", response.accessToken);
          message.success("Welcome back");
          if (onSuccess) onSuccess();
          onClose();
          form.resetFields();
        } else {
          const exists = await UserService.checkIfUserExists(values.username);
          if (exists) {
            message.error("User already exists with this username");
            return;
          } else {
            const response = await AuthService.register(
              values.username,
              values.password
            );
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("accessToken", response.accessToken);
          }