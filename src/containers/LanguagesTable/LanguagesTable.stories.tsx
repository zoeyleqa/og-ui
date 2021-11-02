import React from "react";
import { LanguagesTable } from "./LanguagesTable";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/LanguagesTable",
  component: LanguagesTable
};

export const Default = () => <LanguagesTable baseUrl="http://127.0.0.1:8000" />;
