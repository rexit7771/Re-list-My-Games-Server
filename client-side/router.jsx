import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Login from "./src/pages/login";
import Register from "./src/pages/register";
import Home from "./src/pages/home";
import GameDetail from "./src/pages/gameDetail";
import Profile from "./src/pages/profile";
import MyGames from "./src/pages/fav-games";
import FavGames from "./src/pages/fav-games";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/games/:gameId",
        element: <GameDetail />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/fav-Games",
        element: <FavGames />,
      },
    ],
  },
]);
