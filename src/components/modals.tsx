"use client";
import { useState, useEffect } from "react";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

export const Modals = () => {
  // fix a potential hydration issue start
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  // fix a potential hydration issue end

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
