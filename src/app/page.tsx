"use client";

import { useEffect, useMemo } from "react";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  // same as useState, but it is global
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorspaces();

  const router = useRouter();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      // router.replace replaces, history. Back button will not return to page being replaced
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      // if current modal is not open, open it for th euser
      setOpen(true);
    }
  }, [isLoading, workspaceId, open, setOpen, router]);

  return (
    <div>
      Logged In
      <UserButton />
    </div>
  );
}
