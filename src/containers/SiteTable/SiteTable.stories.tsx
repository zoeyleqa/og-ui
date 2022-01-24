import React from "react";
import { SiteTable } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/SiteTable",
  component: SiteTable
};

export const Default = () => <SiteTable baseUrl="http://127.0.0.1:8000" />;
