import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../homepage/Home";
import Quiz from "../quizpage/Quiz";
import Result from "../resultpage/Result";
import Dashboard from "../dashboard/Dashboard";
import Courses from "../coursespage/Courses";
import CourseDetails from "../coursespage/CourseDetails"; // <-- IMPORTAR A NOVA TELA (Criaremos abaixo)
import Tutorial from "../tutorialpage/Tutorial";
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
    path: "/register",
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
    path: "/courses/:id",
    element: <CourseDetails />,
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