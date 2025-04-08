import React, { useState, useEffect } from "react";
import Header from "./Header";
import DateNavigation from "./DateNavigation";
import AddTaskButton from "./AddTaskButton";
import AddTaskModal from "./AddTaskModal";
import TaskList from "./TaskList";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../App.css";

export default function TasksPage() {
  // Define formatting of dates
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const today = new Date().toLocaleDateString("en-UK", options); //todays's date
  let week = [];

  // Calculate the offset to get from today to Monday
  const currentDayOfWeek = new Date().getDay(); // 0 (Sun) to 6 (Sat)
  const daysToMonday = (currentDayOfWeek === 0 ? -6 : 1) - currentDayOfWeek;

  // add this week's date to the week array
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

  const url = "http://localhost:6005/api/tasks";

  //get tasks from the backend on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode JWT to get user ID
        const userId = decodedToken.id;

        axios
          .get(url)
          .then((response) => {
            const tasksFromDb = response.data;

            // Filter tasks by current user
            const userTasks = tasksFromDb.filter(
              (task) => task.userId === userId
            );

            // Group tasks by their associated date
            const groupedTasks = userTasks.reduce((acc, task) => {
              const day = task.currentDate;
              if (!acc[day]) {
                acc[day] = [];
              }
              acc[day].push({
                taskName: task.taskName,
                taskDesc: task.taskDesc,
                deadline: task.deadline,
                status: task.status,
                _id: task._id,
              });
              return acc;
            }, {});

            setTasks(groupedTasks); // Save grouped tasks in state
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          });
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, []);

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true);
  };

  const closeModal = () => {
    setShowAddTaskModal(false);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setCurrentDate(week[Number(day.split("")[1]) - 1]); // Update current date based on selected day
  };

  // add a new task
  const addTask = (task) => {
    const token = localStorage.getItem("token");
    let uid;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        uid = decodedToken.id;
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }

    //add current date and user ID to the new task
    const fullTask = { ...task, currentDate: selectedDay, userId: uid };

    axios
      .post(url, fullTask) //send this task to the database
      .then((response) => {
        alert(response.data.msg);
        window.location.reload();
        closeModal();
      })
      .catch((error) => {
        alert(error);
        console.error("Error on adding task");
      });

    //update the task list in UI
    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedDay]: [...(prevTasks[selectedDay] || []), task],
    }));
  };

  const deleteTask = (taskToDelete) => {
    const delUrl = `${url}/${taskToDelete._id}`;

    if (window.confirm("Are you sure you want to delete this task?")) {
      axios
        .delete(delUrl)
        .then(() => {
          // Remove task from UI
          setTasks((prevTasks) => ({
            ...prevTasks,
            [selectedDay]: prevTasks[selectedDay].filter(
              (task) => task !== taskToDelete
            ),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

      {/* Weekday navigation */}
      <DateNavigation onDayClick={handleDayClick} selectedDay={selectedDay} />

      {/* Display task list for the selected day */}
      <TaskList tasks={tasks[selectedDay] || []} onDelete={deleteTask} />

      <AddTaskButton handleAddTaskClick={handleAddTaskClick} />

      {/* Modal for adding a task */}
      <AddTaskModal
        addTask={addTask}
        closeModal={closeModal}
        showAddTaskModal={showAddTaskModal}
      />
    </div>
  );
}
