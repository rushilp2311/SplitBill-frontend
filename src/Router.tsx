import { Logout, Dashboard, LandingPage, SignIn, SignUp } from "pages";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { getCurrentUser } from "services/authService";

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

const AUTH_ROUTES = [
  {
    path: "/",
    component: () => <Dashboard />,
  },
  {
    path: "/logout",
    component: () => <Logout />,
  },
];

function Router() {
  return (
    <Routes>
      {getCurrentUser()
        ? AUTH_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component()}
            />
          ))
        : ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component()}
            />
          ))}
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default Router;
