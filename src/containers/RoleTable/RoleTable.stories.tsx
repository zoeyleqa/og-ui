import React from "react";
import { RoleTable } from ".";
import * as roles from "./dummyData";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/RoleTable",
  component: RoleTable
};

export const Default = () => <RoleTable baseUrl="http://127.0.0.1:8000" />;
