import React from "react";
import { Story } from "@storybook/react";
import { RolesTable } from "./RolesTable";
import * as roles from "./dummyData";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/RolesTable",
  component: RolesTable
};

export const Default = () => <RolesTable baseUrl="http://127.0.0.1:8000" />;
