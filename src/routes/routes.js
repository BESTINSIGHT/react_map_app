import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import PAGE_404 from "../pages/PAGE_404";
import ReviewHistoryPage from "../pages/ReviewHistoryPage";
import WelcomePage from "../pages/WelcomePage";

export const pagesRoute = [
  { path: "/", element: <WelcomePage /> },
  { path: "/HomePage", element: <HomePage /> },
  { path: "/MapPage", element: <MapPage /> },
  { path: "/ReviewHistoryPage", element: <ReviewHistoryPage /> },
  { path: "*", element: <PAGE_404 /> },
];
