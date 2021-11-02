import React from "react";
import { ExercisesTable } from "./ExercisesTable";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/ExercisesTable",
  component: ExercisesTable
};

export const Default = () => <ExercisesTable baseUrl="http://127.0.0.1:8000" />;
