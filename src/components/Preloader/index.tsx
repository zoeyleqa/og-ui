import React from "react";
import "./style.css";

interface LoaderProps {
  show?: boolean;
  label?: string;
}

export const Preloader = ({ show = true, label = "Loading" }: LoaderProps) => {
  if (!show) return null;

  return (
    <div id="loader-box">
      <div id="inline-loader" />
      <div id="loader-label">
        {label}
        <span className="dots" />
      </div>
    </div>
  );
};
