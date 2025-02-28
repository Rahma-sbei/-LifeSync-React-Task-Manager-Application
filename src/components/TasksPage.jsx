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

  const url = "http://localhost:6005/api/tasks";
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        axios
          .get(url)
          .then((response) => {
            const tasksFromDb = response.data;
            const userTasks = tasksFromDb.filter(
              (task) => task.userId === userId
            );

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

            setTasks(groupedTasks);
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
    console.log(day.split("")[1]);
    setCurrentDate(week[Number(day.split("")[1]) - 1]);
  };

  const addTask = (task) => {
    const token = localStorage.getItem("token");
    let uid;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("this is the decode token", decodedToken);
        console.log(decodedToken.id);
        uid = decodedToken.id;
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    console.log(uid);
    const fullTask = { ...task, currentDate: selectedDay, userId: uid };
    console.log(fullTask);

    axios
      .post(url, fullTask)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        window.location.reload();
        closeModal();
      })
      .catch((error) => {
        alert(error);
        console.error("Error on adding task");
      });
    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedDay]: [...(prevTasks[selectedDay] || []), task],
    }));
  };

  const deleteTask = (taskToDelete) => {
    const delUrl = `${url}/${taskToDelete._id}`;
    if (window.confirm("are you sure you want to delete this task")) {
      axios
        .delete(delUrl)
        .then(() => {
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
