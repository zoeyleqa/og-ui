import React from "react";
import { EventTable } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/EventTable",
  component: EventTable
};

export const Default = () => <EventTable baseUrl="http://127.0.0.1:8000" />;
