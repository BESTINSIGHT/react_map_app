import "./App.css";
import { Routes, Route } from "react-router-dom";
import { pagesRoute } from "./routes/routes";
import HomeHeader from "./components/HomeHeader";
import WrapperContainer from "./components/layout/WrapperContainer";

function App() {
  return (
    <WrapperContainer>
      <HomeHeader />
      <Routes>
        {pagesRoute.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </WrapperContainer>
  );
}

export default App;
