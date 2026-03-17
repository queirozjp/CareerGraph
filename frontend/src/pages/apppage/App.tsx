
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../homepage/Home";
import Quiz from "../quizpage/Quiz"; 
import Result from "../resultpage/Result";
import Dashboard from "../dashboard/Dashboard";
import Courses from "../coursespage/Courses";
import Tutorial from "../tutorialpage/tutorial";
import Profile from "../profilepage/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Quiz />, 
  },
    {
    path: "/login",
    element: <Result />, 
  },
  {
    path: "/dash",
    element: <Dashboard />, 
  },
    {
    path: "/courses",
    element: <Courses />, 
  },
  {
    path: "/tutorial",
    element: <Tutorial />, 
  },
  {
    path: "/profile",
    element: <Profile />, 
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}