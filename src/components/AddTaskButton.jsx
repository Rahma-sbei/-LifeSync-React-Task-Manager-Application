import React from "react";
import { FaPlus } from "react-icons/fa6";
import "../App.css";

export default function AddTaskButton({ handleAddTaskClick }) {
  return (
    <button className="add-task-button" onClick={handleAddTaskClick}>
      <FaPlus />
    </button>
  );
}
