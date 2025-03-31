import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { Input } from "@/components/ui/input";
import { useWorkspaceId } from "@/components/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/components/hooks/use-confirm";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

function PreferencesModal({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) {
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { isPending: isUpdatingWorkspace, mutate: updateWorkspace } =
    useUpdateWorkspace();
  const { isPending: isRemovingWorkspace, mutate: removeWorkspace } =
    useRemoveWorkspace();

  const [ConfirmRemoveDialog, confirmRemove] = useConfirm(
    "Are you sure?",
    "This action is irreversible"
  );

  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          toast.success("Workspace updated");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    removeWorkspace(
      {
        id: workspaceId,
      },
      {
        onSuccess: () => {
          toast.success("Workspace deleted");
          router.replace("/");
        },
        onError: () => {
          toast.error("Failed to delete workspace");
        },
      }
    );
  };

  const handleCancel = () => {
    // set name to the old value
    setValue(initialValue);
  };

  return (
    <>
      <ConfirmRemoveDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden bg-gray-50">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle className="text-start">{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">Workspace name</p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace name. Ex: 'Work', 'Personal', 'Home'"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        disabled={isUpdatingWorkspace}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingWorkspace}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              disabled={isRemovingWorkspace}
              onClick={handleRemove}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">
                Delete Workspace {isRemovingWorkspace}
              </p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PreferencesModal;
