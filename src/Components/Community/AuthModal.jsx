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
