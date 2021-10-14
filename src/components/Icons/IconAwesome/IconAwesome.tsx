import React from "react";

interface IconProp {
  icon: string;
  style?: any;
}

const IconAwesome = ({ icon, style = null }: IconProp) => {
  if (icon) {
    return <i className={`fa fa-${icon}`} style={style} aria-hidden="true" />;
  }

  return null;
};

export { IconAwesome };
