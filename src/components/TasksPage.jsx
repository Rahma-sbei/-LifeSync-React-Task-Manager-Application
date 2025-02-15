import React, { useState } from "react";
import Header from "./Header";
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
    </div>
  );
}
