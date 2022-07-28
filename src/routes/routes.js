import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import PAGE_404 from "../pages/PAGE_404";
import WelcomePage from "../pages/WelcomePage";

export const pagesRoute = [
  { path: "*", element: <PAGE_404 /> },
  { path: "/", element: <WelcomePage /> },
  { path: "/HomePage", element: <HomePage /> },
  { path: "/MapPage", element: <MapPage /> },
];
