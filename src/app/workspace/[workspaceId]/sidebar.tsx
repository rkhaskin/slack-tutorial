"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { usePathname } from "next/navigation";
import WorkspaceSwitcher from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";
import {
  BellIcon,
  Home,
  MessagesSquareIcon,
  MoreHorizontal,
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessagesSquareIcon} label="DMs" />
      <SidebarButton icon={BellIcon} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col gap-y-1 items-center justify-center mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
