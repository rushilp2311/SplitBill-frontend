import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const ROUTES = [
  {
    path: "/",
    component: () => <LandingPage />,
  },
  {
    path: "/signin",
    component: () => <SignIn />,
  },
  {
    path: "/signup",
    component: () => <SignUp />,
  },
];

function Router() {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.component()} />
      ))}
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default Router;
