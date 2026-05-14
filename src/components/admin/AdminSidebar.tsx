import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Inbox,
  BarChart3,
  Tags,
  LogOut,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import logoProtechx from "@/assets/logo-protechx.jpeg";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Conteúdo (CMS)", url: "/admin/cms", icon: FileText },
  { title: "Formulários", url: "/admin/forms", icon: Inbox },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Tags & Pixels", url: "/admin/tags", icon: Tags },
  { title: "Configurações", url: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <img src={logoProtechx} alt="ProtechX" className="h-8 w-8 rounded flex-shrink-0" />
        {!collapsed && <span className="font-display text-sm font-bold text-foreground uppercase tracking-wide">Admin</span>}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                          isActive ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="font-subtitle text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-3">
        {!collapsed && user && (
          <p className="text-xs text-muted-foreground font-subtitle truncate mb-2">{user.email}</p>
        )}
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors font-subtitle"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Sair"}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
