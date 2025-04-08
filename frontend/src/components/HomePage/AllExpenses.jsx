import React from "react";
import { Card } from "react-bootstrap";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

export default function AllExpenses() {
  const data = {
    datasets: [
      {
        data: [480, 150], // hardcoded data for demonstarion purposes
        backgroundColor: ["#09B392", "transparent"],
        borderWidth: 0,
      },
    ],
  };

  //set chart options
  const options = {
    cutout: "75%", //cutting out 75% of the center
    responsive: true,
    plugins: {
      legend: {
        display: "none", // Hides the legend , we will be handling the labeling manually
      },
      centerText: {
        display: true,
        text: "Resting\n70.58%", // Multiline text to be drawn in the center of the chart
      },
    },
    elements: {
      arc: {
        borderRadius: 15,
      },
    },
  };

  // Custom Chart.js plugin to render text in the center of the doughnut
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx } = chart; // Get drawing context
      const centerX = chart.width / 2; // Horizontal center of canvas
      const centerY = chart.height / 2; // Vertical center of canvas

      const text = chart.config.options.plugins.centerText.text; // Fetch the custom text
      const lines = text.split("\n"); // Split into multiple lines if needed

      ctx.save(); // Save the current canvas state
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const lineHeight = 30; // Vertical space between lines
      const startY = centerY - ((lines.length - 1) * lineHeight) / 2 + 9; // Adjust vertical start position

      // Draw each line centered on the chart
      lines.forEach((line, index) => {
        ctx.fillText(line, centerX, startY + index * lineHeight);
      });

      ctx.restore(); // Restore canvas to its original state
    },
  };

  return (
    <Card
      style={{
        width: "40vw",
        marginLeft: "4px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: "26px",
        height: "27vh",
        backgroundColor: "#17183B",
        backgroundImage:
          "linear-gradient(to bottom right, #080D2A,#17183B,rgba(72, 92, 245, 0.4))",
        backgroundSize: "cover",
        padding: "10px",
        border: "none",
      }}
    >
      <div
        style={{
          marginTop: "10px",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          width: "60%",
        }}
      >
        <Card.Title
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
            marginTop: "8px",
            marginLeft: "20px",
          }}
        >
          This Month's Budget
        </Card.Title>
        <div
          style={{
            marginTop: "8px",
            display: "flex",

            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              color: "#aaa",
              fontWeight: "bold",
              paddingTop: "10px",
              paddingBottom: "0px",
            }}
          >
            <Card.Text>rest </Card.Text>
            <Card.Text style={{ marginLeft: "15px" }}>480.00 Dt</Card.Text>
            <div
              style={{
                marginLeft: "10px",
                width: "30px",
                height: "30px",
                backgroundColor: "#09B392",
                borderRadius: "9px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaArrowUp color="white" />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              color: "#aaa",
              fontWeight: "bold",
            }}
          >
            <Card.Text>Spent </Card.Text>
            <Card.Text style={{ marginRight: "13px" }}>150.00 Dt</Card.Text>
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#B50909",
                borderRadius: "9px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaArrowDown color="white" />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "25vh",
          marginTop: "0px",
          paddingBottom: "5px",
        }}
      >
        <Doughnut
          data={data}
          options={options}
          style={{ marginRight: "40px" }}
          plugins={[centerTextPlugin]}
        />
      </div>
    </Card>
  );
}
