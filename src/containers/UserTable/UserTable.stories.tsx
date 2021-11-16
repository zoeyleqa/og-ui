import React from "react";
import { UserTable } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/UserTable",
  component: UserTable
};

export const Default = () => <UserTable baseUrl="http://127.0.0.1:8000" />;
