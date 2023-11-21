import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./sidebar";

const SidebarLayout = ({ children }) => {
  const location = useLocation();

  // Define an array of route paths where the sidebar should not be displayed
  const excludedRoutes = ["/", "/signup"];

  // Check if the current location matches any of the excluded routes
  const shouldRenderSidebar = !excludedRoutes.includes(location.pathname);

  return (
    <div className="layout">
      {shouldRenderSidebar && <Sidebar />}
      <div className="content">{children}</div>
    </div>
  );
};

export default SidebarLayout;