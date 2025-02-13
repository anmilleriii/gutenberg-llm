import { AppNavUser } from "@/components/app-nav-user";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar>
        <AppNavUser />
      </AppSidebar>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-12 overflow-y-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
