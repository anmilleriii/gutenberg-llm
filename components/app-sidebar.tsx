"use client";

import { LibraryBig, LucideIcon, Search } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

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
          title: "Bookshelf",
          url: "/bookshelf",
        },
      ],
    },
    // {
    //   title: "History",
    //   url: "#",
    //   icon: SquareTerminal,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "History",
    //       url: "/bookshelf",
    //     },
    //   ],
    // },
    // {
    //   title: "Gutenberg LLM",
    //   url: "#",
    //   icon: SquareTerminal,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Sentiment Analysis",
    //       url: "#",
    //     },
    //   ],
    // },
  ] as SidebarItem[],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
