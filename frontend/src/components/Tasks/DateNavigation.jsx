import React from "react";
import ss2 from "../../assets/ss2.png";
import "../../App.css";

export default function DateNavigation({ onDayClick, selectedDay }) {
  // each numeric string (day) has a corresponding weekday label
  const days = [
    { day: "01", label: "M" },
    { day: "02", label: "T" },
    { day: "03", label: "W" },
    { day: "04", label: "T" },
    { day: "05", label: "F" },
    { day: "06", label: "S" },
    { day: "07", label: "S" },
  ];

  return (
    <div
      style={{
        width: "95%",
        backgroundColor: "white",
        display: "flex",
        borderRadius: "20px",
        marginTop: "30px",
        backgroundImage: `url('${ss2}')`,
        backgroundSize: "cover",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100px",
      }}
    >
      {/* Map over each day object and render it as a clickable date item */}
      {days.map(({ day, label }) => (
        <div
          key={day}
          className={`date-item ${selectedDay === day ? "selected" : ""}`}
          onClick={() => onDayClick(day)} // Trigger the parent handler when a day is clicked
        >
          <div className="date-number">{day}</div>
          <div className="date-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
