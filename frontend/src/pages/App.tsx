
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Quiz />, 
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}