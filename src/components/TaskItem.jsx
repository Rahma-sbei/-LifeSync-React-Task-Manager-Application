import React, { useState } from "react";
import "../App.css";
import { Button } from "react-bootstrap";

export default function TaskItem({ task, onDelete }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [status, setStatus] = useState("Incomplete");
  const toggleStatus = (taskToUpdate) => {
    setStatus(taskToUpdate.status);
    console.log("taskToUpdate.status", taskToUpdate.status);

    if (status === "Incomplete") {
      setStatus("Complete");
      console.log(status);
    } else if (status === "Complete") {
      // console.log(status);
      setStatus("Incomplete");
    }
  };

  return (
    <div className="task-item">
      <div className="task-details">
        <h3>{task.taskName}</h3>
        <p>{task.taskDesc}</p>
      </div>
      <Button className="status" onClick={() => toggleStatus(task)}>
        {status}
      </Button>
      <div className="task-time">
        {new Date(task.deadline).toLocaleDateString("en-UK", options)}
      </div>

      <button className="delete-button" onClick={() => onDelete(task)}>
        🗑️
      </button>
    </div>
  );
}
