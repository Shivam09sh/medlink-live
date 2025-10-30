import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  FileText, 
  Users, 
  Pill, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Medical Records", href: "/medical-records", icon: FileText },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Prescriptions", href: "/prescriptions", icon: Pill },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

const settings = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">MEDORA</h1>
              <p className="text-xs text-sidebar-foreground/60">Healthcare Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="mb-6">
            <p className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
              Main Navigation
            </p>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-sidebar-border">
            <p className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
              Settings
            </p>
            {settings.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Dr. Alex Morgan</p>
              <p className="text-xs text-sidebar-foreground/60">Cardiologist</p>
            </div>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
