import { SidebarInset, SidebarProvider, SidebarTrigger, TooltipProvider } from "@shop/ui";

import { requireAdminAccess } from "@/shared/auth/helpers/admin-guard";
import { AdminSidebarEntry } from "@/widgets/admin-sidebar";

export const instant = false;

const AdminLayout = async ({ children }: LayoutProps<"/admin">) => {
  const _session = await requireAdminAccess();

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
