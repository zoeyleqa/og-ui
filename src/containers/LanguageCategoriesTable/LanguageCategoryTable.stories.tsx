import React from "react";
import { LanguageCategoryTable } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/LanguageCategoryTable",
  component: LanguageCategoryTable
};

export const Default = () => <LanguageCategoryTable baseUrl="http://127.0.0.1:8000" />;
