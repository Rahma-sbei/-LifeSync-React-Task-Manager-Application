import { BrowserRouter } from "react-router-dom";
import FullApp from "./components/FullApp";
import React, { createContext, useState } from "react";

export const ShowContext = createContext();
function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ShowContext.Provider value={{ handleClose, handleShow, show }}>
      <BrowserRouter>
        <FullApp />
      </BrowserRouter>
    </ShowContext.Provider>
  );
}

export default App;
