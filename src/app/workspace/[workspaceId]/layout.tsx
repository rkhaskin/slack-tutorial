import React from "react";
import Toolbar from "./toolbar";
import { Sidebar } from "./sidebar";

interface WorkspaceIdlayoutProps {
  children: React.ReactNode;
}
function WorkspaceIdLayout({ children }: WorkspaceIdlayoutProps) {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        {/* 40 px is the height of the toolbar*/}
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

export default WorkspaceIdLayout;
