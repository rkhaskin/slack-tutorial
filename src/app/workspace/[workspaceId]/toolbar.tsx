"use client";

import { useWorkspaceId } from "@/components/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { useGetWorspace } from "@/features/workspaces/api/use-get-workspace";
import { Info, Search } from "lucide-react";
import React from "react";

function Toolbar() {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorspace({ id: workspaceId });
  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1"></div>
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search {data?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="text-w size-5" />
        </Button>
      </div>
    </nav>
  );
}

export default Toolbar;
