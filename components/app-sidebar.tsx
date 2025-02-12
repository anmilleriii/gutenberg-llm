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
import { SessionProvider } from "next-auth/react";
import { AppNavUser } from "./app-nav-user";

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
      url: "/explore",
      icon: Search,
      isActive: true,
      items: [
        {
          title: "Explore",
          url: "/explore",
        },
      ],
    },
    {
      title: "Bookshelf",
      url: "/bookshelf",
      icon: LibraryBig,
      isActive: true,
      items: [
        {
          title: "Saved Books",
          url: "/bookshelf",
        },
        {
          title: "History",
          url: "/history",
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
      <SidebarFooter>
        <SessionProvider>
          <AppNavUser />
        </SessionProvider>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
