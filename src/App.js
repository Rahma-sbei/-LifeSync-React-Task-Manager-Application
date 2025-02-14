import SignIn from "./components/SignIn";
function App() {
  return (
    <div
      style={{
        background: "#080D2A",
        backgroundImage: `
        radial-gradient(ellipse at center top, #1B1B37 0%, rgba(4, 7, 26, 0.2) 50%),
        radial-gradient(ellipse at 60% 50%, #3436A8 0%, rgba(27, 27, 54, 0.15) 70%),
        radial-gradient(ellipse at center bottom, #485CF5 0%, rgba(4, 7, 26, 0.2) 55%),
        radial-gradient(ellipse at 30% 70%, #485CF5 0%, rgba(27, 27, 54, 0.1) 80%),
        radial-gradient(ellipse at 70% 60%, #3436A8 0%, rgba(4, 7, 26, 0.2) 90%)
      `,
        backgroundSize: "cover",
        minHeight: "100vh",
        margin: "0px",
        padding: "0px",
        paddingBottom: "30px",
      }}
    >
      <SignIn />
    </div>
  );
}

export default App;
