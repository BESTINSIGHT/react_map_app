import { useState } from "react";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";

function App() {
  const [currentNav, setCurrentNav] = useState("welcomePage");

  return (
    <div>
      {currentNav === "welcomePage" ? (
        <WelcomePage setCurrentNav={setCurrentNav} />
      ) : currentNav === "HomePage" ? (
        <HomePage />
      ) : null}
    </div>
  );
}

export default App;
