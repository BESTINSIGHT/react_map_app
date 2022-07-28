import "./App.css";
import { Routes, Route } from "react-router-dom";
import { pagesRoute } from "./routes/routes";

function App() {
  return (
    <div>
      <Routes>
        {pagesRoute.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact></Route>
        ))}
      </Routes>
    </div>
  );
}

export default App;
