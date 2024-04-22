import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import SignIn from "../pages/SignIn/SignIn";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import MovieManagement from "../pages/MovieManagement/MovieManagement";
import AddMovie from "../pages/AddMovie/AddMovie";
import UserManagement from "../pages/UserManagement/UserManagement";
import AddUser from "../pages/AddUser/AddUser";
import AccountManagement from "../pages/AccountManagement/AccountManagement";
import UserBookingDetails from "../components/UserBookingDetails.jsx/UserBookingDetails";
import UserDetails from "../components/UserDetails/UserDetails";
import MovieDetailsTemplate from "../template/MovieDetailsTemplate/MovieDetailsTemplate";
import SignUp from "../pages/SignUp/SignUp";
import AddSchedule from "../pages/AddSchedule/AddSchedule";
import Ticket from "../layout/Ticket/Ticket";
import SeatLayout from "../components/SeatLayout/SeatLayout";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserTemplate />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/movie/:slug",
      element: <MovieDetailsTemplate />,
    },
    {
      path: "/ticket",
      element: <Ticket />,
      children: [
        {
          path: ":scheduleId",
          element: <SeatLayout />,
        },
      ],
    },
    {
      path: "/account",
      element: <AccountManagement />,
      children: [
        {
          index: true,
          element: <UserDetails />,
        },
        {
          path: "booking",
          element: <UserBookingDetails />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminTemplate />,
      children: [
        {
          element: <AddMovie />,
          index: true,
        },
        {
          path: "movie-management",
          element: <MovieManagement />,
        },
        {
          path: "add-movie",
          element: <AddMovie />,
        },
        {
          path: "add-movie/:slug",
          element: <AddMovie />,
        },
        {
          path: "user-management",
          element: <UserManagement />,
        },
        {
          path: "add-user",
          element: <AddUser />,
        },
        {
          path: "add-user/:slug",
          element: <AddUser />,
        },
        {
          path: "add-schedule/:slug",
          element: <AddSchedule />,
        },
      ],
    },
  ]);
  return routes;
};

export default useRoutesCustom;
