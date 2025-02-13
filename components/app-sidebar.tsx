"use client";

import { LibraryBig, LucideIcon, Search } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

export interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Explore",
      icon: Search,
      isActive: true,
      items: [
        {
          title: "Search",
          url: "/explore",
        },
      ],
    },
    {
      title: "Bookshelf",
      icon: LibraryBig,
      isActive: true,
      items: [
        {
          title: "Saved Books",
          url: "/bookshelf",
        },
      ],
    },
  ] as SidebarItem[],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{props.children}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
