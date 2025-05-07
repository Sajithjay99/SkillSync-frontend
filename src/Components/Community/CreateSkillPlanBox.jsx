import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const CreateSkillPlanBox = () => {
  const snap = useSnapshot(state);