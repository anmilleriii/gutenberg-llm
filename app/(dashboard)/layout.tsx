import { MySidebar } from "@/lib/layout/sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <MySidebar>{children}</MySidebar>;
}
