import React from "react";
import TaskItem from "./TaskItem";
import "../../App.css";
import { Card } from "react-bootstrap";

export default function TaskList({ tasks, onDelete }) {
  return (
    <Card
      style={{
        padding: "30px",
        marginTop: "30px",
        minHeight: "200px",
        width: "95%",
        borderRadius: "20px",
        border: "none",
        backgroundColor: "#17183B",
        backgroundImage:
          "linear-gradient(to right, #080D2A,#17183B,rgba(72, 92, 245, 0.4))",
        backgroundSize: "cover",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tasks.length > 0 ? (
        tasks.map(
          (task, index) => (
            console.log(task.taskName),
            (<TaskItem key={index} task={task} onDelete={onDelete} />)
          )
        )
      ) : (
        <Card.Text
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            letterSpacing: "3px",
            color: "#aaa",
          }}
        >
          No Tasks For This Date
        </Card.Text>
      )}
    </Card>
  );
}
