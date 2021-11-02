import React from "react";
import { AttendeesTable } from "./AttendeesTable";
import * as attendees from "./dummyData";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/AttendeesTable",
  component: AttendeesTable
};

export const Default = () => <AttendeesTable baseUrl="http://127.0.0.1:8000" />;
