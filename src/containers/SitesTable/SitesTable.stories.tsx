import React from "react";
import { SitesTable } from "./SitesTable";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/SitesTable",
  component: SitesTable
};

export const Default = () => <SitesTable baseUrl="http://127.0.0.1:8000" />;
