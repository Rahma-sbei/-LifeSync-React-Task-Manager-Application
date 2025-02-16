import React, { useState } from "react";
import Header from "./Header";
import DateNavigation from "./DateNavigation";
import AddTaskButton from "./AddTaskButton";
import AddTaskModal from "./AddTaskModal";
import TaskList from "./TaskList";
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
  const [selectedDay, setSelectedDay] = useState("01");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState({});

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true);
  };

  const closeModal = () => {
    setShowAddTaskModal(false);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    console.log(day.split("")[1]);
    setCurrentDate(week[Number(day.split("")[1]) - 1]);
  };

  const addTask = (task) => {
    const fullTask = {
      ...task,
      currentDate: selectedDay,
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedDay]: [...(prevTasks[selectedDay] || []), task],
    }));
  };

  const deleteTask = (taskToDelete) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedDay]: prevTasks[selectedDay].filter(
        (task) => task !== taskToDelete
      ),
    }));
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
      <Header currentDate={currentDate} />
      <DateNavigation onDayClick={handleDayClick} selectedDay={selectedDay} />
      <TaskList tasks={tasks[selectedDay] || []} onDelete={deleteTask} />
      <AddTaskButton handleAddTaskClick={handleAddTaskClick} />
      <AddTaskModal
        addTask={addTask}
        closeModal={closeModal}
        showAddTaskModal={showAddTaskModal}
      />
    </div>
  );
}
