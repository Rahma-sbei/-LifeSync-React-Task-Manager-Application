import React, { useState } from "react";
import "../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTaskModal({
  addTask,
  closeModal,
  showAddTaskModal,
}) {
  const [taskName, settaskName] = useState("");
  const [day, setDay] = useState("");
  const [taskDesc, settaskDesc] = useState("");

  const resetForm = () => {
    settaskName("");
    setDay("");
    settaskDesc("");
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };
  const status = "Incomplete";
  const handleSubmit = () => {
    if (!taskName || !taskDesc || !day) {
      alert("All field need to be filled to create a task.");
    } else {
      const deadline = day
        .toLocaleDateString("en-US", {
          year: "numeric",
          day: "2-digit",
          month: "2-digit",
        })
        .replace(/\//g, "-");
      addTask({ taskName, taskDesc, deadline, status });
      resetForm();
      closeModal();
    }
  };

  return (
    <div className={`modall ${showAddTaskModal ? "show" : ""}`}>
      <div
        style={{
          position: "absolute",
          zIndex: "-1",
          width: "100%",
          height: "100%",
          backdropFilter: "blur(10px)",
          overflow: "auto",
          padding: "0px ",
        }}
      ></div>
      <h2 style={{ marginTop: "50px" }}>Add Task</h2>
      <h4 style={{ marginBottom: "50px" }}>
        Fill out the information to add a new task
      </h4>
      <div className="modalContent">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => settaskName(e.target.value)}
        />
        <DatePicker
          selected={day}
          onChange={(day) => setDay(day)}
          placeholderText="Select Task Deadline"
          dateFormat="dd-MM-yyyy"
        />
        <textarea
          placeholder="Add task description"
          value={taskDesc}
          onChange={(e) => settaskDesc(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <button className="btn1" onClick={handleSubmit}>
            Create Task
          </button>
          <button className="btn2" onClick={handleClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
