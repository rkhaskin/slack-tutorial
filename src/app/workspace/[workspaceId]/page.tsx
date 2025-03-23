import React from "react";

interface WorkspaceIdPageProps {
  params: Promise<{
    workspaceId: Promise<string>;
  }>;
}

async function WorkspaceIdPage({ params }: WorkspaceIdPageProps) {
  const { workspaceId } = await params;
  return <div>{workspaceId}</div>;
}

export default WorkspaceIdPage;
