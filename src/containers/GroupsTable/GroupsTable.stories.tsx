import React from "react";
import { GroupsTable } from "./GroupsTable";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/GroupsTable",
  component: GroupsTable
};

export const Default = () => <GroupsTable baseUrl="http://127.0.0.1:8000" />;
