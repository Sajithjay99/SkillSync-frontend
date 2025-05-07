import React, { useState, useEffect } from "react";
import {
  Tabs,
  Card,
  Tag,
  Empty,
  Spin,
  Statistic,
  Row,
  Col,
  Button
} from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import LearningService from "../../Services/LearningService";
import CreateLearningModal from "../Modals/CreateLearningModal";
import LearningDetailsModal from "../Modals/LearningDetailsModal";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
  CalendarOutlined,
  TrophyOutlined,
  BookOutlined,
  ExperimentOutlined,
  PlusOutlined
} from "@ant-design/icons";

const { TabPane } = Tabs;

const LearningDashboard = () => {
  const snap = useSnapshot(state);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    onHold: 0,
    recent: 0,
    byTemplate: {}
  });

  const loadUserLearning = async () => {
    if (!snap.currentUser?.uid) return;
    try {
      setLoading(true);
      const userLearning = await LearningService.getLearningByUserId(snap.currentUser.uid);
      userLearning.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      state.learningEntries = userLearning;

      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const templateCounts = {};
      const completed = userLearning.filter(e => e.status === "Completed").length;
      const inProgress = userLearning.filter(e => e.status === "In Progress").length;
      const onHold = userLearning.filter(e => e.status === "On Hold").length;
      const recent = userLearning.filter(e => new Date(e.timestamp) > oneWeekAgo).length;

      userLearning.forEach(e => {
        const template = e.template || "general";
        templateCounts[template] = (templateCounts[template] || 0) + 1;
      });

      setStats({
        total: userLearning.length,
        completed,
        inProgress,
        onHold,
        recent,
        byTemplate: templateCounts
      });
    } catch (err) {
      console.error("Failed to fetch learning entries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserLearning();
  }, [snap.currentUser?.uid]);

  const handleViewDetails = (learning) => {
    state.selectedLearning = learning;
    state.learningDetailsModalOpened = true;
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "Completed":
        return <Tag color="success" icon={<CheckCircleOutlined />}>Completed</Tag>;
      case "In Progress":
        return <Tag color="processing" icon={<ClockCircleOutlined />}>In Progress</Tag>;
      case "On Hold":
        return <Tag color="warning" icon={<PauseCircleOutlined />}>On Hold</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const getTemplateIcon = (template) => {
    switch (template) {
      case "certification":
        return <TrophyOutlined />;
      case "challenge":
        return <ExperimentOutlined />;
      default:
        return <BookOutlined />;
    }
  };

  const getTemplateLabel = (template) => {
    switch (template) {
      case "certification":
        return "Certification";
      case "challenge":
        return "Challenge";
      default:
        return "General";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const renderLearningCard = (learning) => (
    <Card
      key={learning.id}
      className="learning-card"
      title={
        <div className="learning-card-title">
          <span className="template-icon">{getTemplateIcon(learning.template)}</span>
          <span>{learning.topic}</span>
        </div>
      }
      extra={getStatusTag(learning.status)}
      onClick={() => handleViewDetails(learning)}
    >
      <div className="card-content">
        <p className="template-tag">{getTemplateLabel(learning.template)}</p>
        <p className="description">{learning.description}</p>
        <div className="card-footer">
          <span className="timestamp">{formatDate(learning.timestamp)}</span>
          <Button type="link" onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(learning);
          }}>
            Details
          </Button>
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  