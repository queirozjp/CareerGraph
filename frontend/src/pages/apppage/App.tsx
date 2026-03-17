
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../homepage/Home";
import Quiz from "../quizpage/Quiz"; 
import Result from "../resultpage/Result";
import Dashboard from "../dashboard/Dashboard";
import Courses from "../coursespage/Courses";

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
]);

export default function App() {
  return <RouterProvider router={router} />;
}