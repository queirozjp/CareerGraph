import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../homepage/Home";
import Quiz from "../quizpage/Quiz";
import Result from "../resultpage/Result";
import Dashboard from "../dashboard/Dashboard";
import Courses from "../coursespage/Courses";
import CourseDetails from "../coursespage/CourseDetails"; // <-- IMPORTAR A NOVA TELA (Criaremos abaixo)
import Tutorial from "../tutorialpage/Tutorial";
import Profile from "../profilepage/Profile";

const PrivateRoutes = ({children}) => {
  const token = localStorage.getItem("token");
  if(!token){
    return <Navigate to="/" replace />
  }
  return children;
}

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
    element: (
        <PrivateRoutes>
          <Dashboard />
        </PrivateRoutes>
    ),
  },
  {
    path: "/courses",
    element: (
        <PrivateRoutes>
          <Courses />
        </PrivateRoutes>
    ),
  },
  {
    path: "/courses/:id",
    element: (
        <PrivateRoutes>
          <CourseDetails />
        </PrivateRoutes>
    ),
  },
  {
    path: "/tutorial",
    element: (
        <PrivateRoutes>
          <Tutorial />
        </PrivateRoutes>
    ),
  },
  {
    path: "/profile",
    element: (
        <PrivateRoutes>
          <Profile />
        </PrivateRoutes>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}