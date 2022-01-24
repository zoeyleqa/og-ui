import React from "react";
import { ExerciseTable } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Containers/ExerciseTable",
  component: ExerciseTable
};

export const Default = () => <ExerciseTable baseUrl="http://127.0.0.1:8000" />;
