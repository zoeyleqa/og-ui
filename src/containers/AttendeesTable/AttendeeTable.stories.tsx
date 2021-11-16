import React from "react";
import { AttendeeTable } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/AttendeeTable",
  component: AttendeeTable
};

export const Default = () => <AttendeeTable baseUrl="http://127.0.0.1:8000" />;
