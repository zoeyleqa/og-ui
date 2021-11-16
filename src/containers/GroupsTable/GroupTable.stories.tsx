import React from "react";
import { GroupTable } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/GroupTable",
  component: GroupTable
};

export const Default = () => <GroupTable baseUrl="http://127.0.0.1:8000" />;
