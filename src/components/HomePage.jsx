import React from "react";
import WelcomeCard from "./WelcomCard";
import TaskChart from "./TaskChart";
import TodaysDeadLines from "./TodaysDeadlines";
import AllExpenses from "./AllExpenses";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <WelcomeCard />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "start",
        }}
      >
        <TaskChart />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TodaysDeadLines />
          <AllExpenses />
        </div>
      </div>
    </div>
  );
}
