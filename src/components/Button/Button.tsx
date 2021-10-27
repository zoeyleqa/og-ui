import React from "react";
import { Button as BSButton } from "react-bootstrap";
import { IconLabel } from "../Icons/IconLabel";
import btnVariant from "./variant";
import "./button.css";

export interface ButtonProps {
  size?: "sm" | "lg";
  type?: string;
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  size = "sm",
  type = "loader",
  onClick,
  label = "",
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const btn = btnVariant[type];

  return (
    <BSButton
      size={size}
      variant={btn.variant}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <IconLabel label={label || btn.loadingText} awesomeIcon="spin" />
      ) : (
        <IconLabel label={label || btn.label} awesomeIcon={btn.awesomeIcon} />
      )}
    </BSButton>
  );
};
