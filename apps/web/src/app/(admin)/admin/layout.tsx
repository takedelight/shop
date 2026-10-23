import { SidebarInset, SidebarProvider, SidebarTrigger, TooltipProvider } from "@shop/ui";

import { AdminSidebarEntry } from "@/widgets/admin-sidebar";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AdminSidebarEntry />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
          </header>
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default AdminLayout;
