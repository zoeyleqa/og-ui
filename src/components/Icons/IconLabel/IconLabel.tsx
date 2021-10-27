import React from "react";
import { IconAwesome } from "../IconAwesome";

interface LabelProps {
  awesomeIcon: string;
  label: string;
  iconFirst?: boolean;
}

const IconLabel = ({ awesomeIcon, label, iconFirst = true }: LabelProps) => {
  const iconPadding = iconFirst ? { paddingRight: 10 } : { paddingLeft: 10 };
  const renderIcon = () => {
    return <IconAwesome icon={awesomeIcon} style={iconPadding} />;
  };

  if (iconFirst) {
    return (
      <span>
        {renderIcon()}
        {label}
      </span>
    );
  }

  return (
    <span>
      {label}
      {renderIcon()}
    </span>
  );
};

export { IconLabel };
