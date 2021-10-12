import React from "react";
import { Button as BSButton } from "react-bootstrap";
import { IconLabel } from "../Icons/IconLabel";
import btnVariant from "./variant";

export interface ButtonProps {
  /**
   * How large should the button be?
   */
  size?: "sm" | "lg";
  type?: string;
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const TestButton = ({
  size = "sm",
  type = "loader",
  onClick,
  label = "",
  disabled = false,
  ...rest
}: ButtonProps) => {
  const btn = btnVariant[type];

  return (
    <BSButton size={size} variant={btn.variant} onClick={onClick} {...rest}>
      <IconLabel label={label || btn.label} awesomeIcon={btn.awesomeIcon} />
    </BSButton>
  );
};
