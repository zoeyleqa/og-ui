import React from "react";
import { Dashboard } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/Dashboard",
  component: Dashboard
};

export const Default = () => <Dashboard baseUrl="http://127.0.0.1:8000" />;
