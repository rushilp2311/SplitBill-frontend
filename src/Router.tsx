import {
  Logout,
  Dashboard,
  LandingPage,
  SignIn,
  SignUp,
  Home,
  Page404,
  Groups,
  GroupDetail,
  AddExpense,
} from "pages";
import AddGroup from "pages/Groups/AddGroup";
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
    routes: [
      { path: "/", component: () => <Home /> },
      { path: "/profile", component: () => <h1>Profile</h1> },
      {
        path: "/groups",
        component: () => <Groups />,
      },
      { path: "/addgroup", component: () => <AddGroup /> },
      { path: "/group/detail/:groupId", component: () => <GroupDetail /> },
      { path: "/group/:groupId/addexpense", component: () => <AddExpense /> },
    ],
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
            >
              {route.routes &&
                route.routes.map((subRoute) => (
                  <Route
                    key={subRoute.path}
                    path={subRoute.path}
                    element={subRoute.component()}
                  />
                ))}
            </Route>
          ))
        : ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component()}
            />
          ))}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default Router;
