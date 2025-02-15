import React, { useState, useEffect } from "react";
import DateNavigation from "./DateNavigation";
import TaskList from "./TaskList";
import AddTaskButton from "./AddTaskButton";
import AddTaskModal from "./AddTaskModal";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../App.css";

export default function TasksPage() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date().toLocaleDateString("en-UK", options);
  let week = [];
  const currentDayOfWeek = new Date().getDay();
  const daysToMonday = (currentDayOfWeek === 0 ? -6 : 1) - currentDayOfWeek;

  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(
        new Date().setDate(new Date().getDate() + daysToMonday + i)
      ).toLocaleDateString("en-UK", options)
    );
  }
  const [currentDate, setCurrentDate] = useState(today);

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true);
  };

  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header
        currentDate={currentDate}
        handleAddTaskClick={handleAddTaskClick}
      />
    </div>
  );
}
