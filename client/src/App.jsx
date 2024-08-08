import Navbar from "./components/navbar"

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from "@/layouts/main-layout";
import MainPage from "@/pages/main-page";
import RegisterPage from "@/pages/register-page";
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
]);
function App() {
return (
  <RouterProvider router={router} />
)
} 
export default App
