import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetWorkspaceProps {
  id: Id<"workspaces">;
}

// this call is cached. Two calls from different pages will get the same result. First call call db, second gets result from cache
export const useGetWorspace = ({ id }: useGetWorkspaceProps) => {
  const data = useQuery(api.workspaces.getById, { id });
  const isLoading = data === undefined;

  return { isLoading, data };
};
