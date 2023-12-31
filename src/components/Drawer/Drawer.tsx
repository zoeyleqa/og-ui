import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

type pos = {
  [key: string]: string;
};

const position: pos = {
  left: "start",
  right: "end",
  top: "top",
  bottom: "bottom"
};

interface DrawerProps {
  id: string | number;
  title?: string;
  drawerPos?: any;
  content: any;
}

export const Drawer = ({
  id,
  title = "Drawer",
  drawerPos = "right",
  content
}: DrawerProps) => {
  const placement = `offcanvas-${position[drawerPos]}`;
  const headerclassName = `offcanvas ${placement}`;

  return (
    <div
      className={headerclassName}
      id={`offcanvas-${id}`}
      aria-labelledby={`offcanvas-${id}`}
      data-bs-scroll="true"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id={`offcanvas-title-${id}`}>
          {title}
        </h5>
        <button
          type="button"
          id={`offcanvas-close-${id}`}
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">{content}</div>
    </div>
  );
};
