"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");

  const { mutate, isPending } = useCreateWorkspace();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    // TODO clear
    setName("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        name,
      },
      {
        onSuccess(workspaceId) {
          toast.success("Workspace created");
          router.push(`/workspace/${workspaceId}`);
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name. Ex: 'Work', 'Personal', 'Home'"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
