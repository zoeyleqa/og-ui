import React from "react";
import { LanguageTable } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/LanguageTable",
  component: LanguageTable
};

export const Default = () => <LanguageTable baseUrl="http://127.0.0.1:8000" />;
