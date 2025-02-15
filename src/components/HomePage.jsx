import React from "react";
import WelcomeCard from "./WelcomCard";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <WelcomeCard />
    </div>
  );
}
