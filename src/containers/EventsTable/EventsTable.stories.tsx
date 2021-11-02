import React from "react";
import { EventsTable } from "./EventsTable";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/EventsTable",
  component: EventsTable
};

export const Default = () => <EventsTable baseUrl="http://127.0.0.1:8000" />;
