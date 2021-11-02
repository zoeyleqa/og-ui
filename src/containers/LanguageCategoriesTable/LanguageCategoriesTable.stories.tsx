import React from "react";
import { LanguageCategoriesTable } from "./LanguageCategoriesTable";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/LanguageCategoriesTable",
  component: LanguageCategoriesTable
};

export const Default = () => <LanguageCategoriesTable baseUrl="http://127.0.0.1:8000" />;
