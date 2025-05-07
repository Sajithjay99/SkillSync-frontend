import React, { useEffect, useState } from "react";
import { Modal, Tabs, Avatar, Row, Col, Button, message } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import axios from "axios";
import { BASE_URL } from "../../constants";
import FriendsPost from "../Community/FriendsPost";
import "../../Styles/CenterSection.css";
import "../../Styles/community.css";
import "../../Styles/LeftMenu.css";
import UserConnectionService from "../../Services/UserConnectionService";
const { TabPane } = Tabs;

const FriendProfileModal = () => {
  const snap = useSnapshot(state);
  const [userData, setUserData] = useState();
  const [isFriend, setIsFriend] = useState(false);
  const [addFriendLoading, setAddFriendLoading] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/users/${snap.selectedUserProfile?.userId}`, config)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {});
  }, [snap.selectedUserProfile]);

  const addFriend = async () => {
    if (!isFriend) {
      try {
        const body = {
          userId: snap.currentUser?.uid,
          friendIds: [snap.selectedUserProfile?.id],
        };
        await UserConnectionService.createUserConnection(body);
        message.success("Friend added successfully!");
        setIsFriend(true);
      } catch (error) {
        console.error("Error adding friend:", error);
        message.error("Failed to add friend. Please try again later.");
      }
    } else {
      message.warning("You are already friends with this user.");
    }
  };
  const checkFriendshipStatus = async () => {
    try {
      const connections = await UserConnectionService.getUserConnections(
        snap.currentUser?.uid
      );
      if (connections.friendIds.includes(snap.selectedUserProfile.id)) {
        setIsFriend(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unfriendFriend = async () => {
    try {
      setAddFriendLoading(true);
      await UserConnectionService.deleteUserConnection(
        snap.currentUser?.uid,
        snap.selectedUserProfile?.id
      );
      setIsFriend(false);
      message.info("Unfriend successfully");
    } catch (error) {
    } finally {
      setAddFriendLoading(false);
    }
  };

  useEffect(() => {
    checkFriendshipStatus();
  }, []);

  
};

export default FriendProfileModal;
