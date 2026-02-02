"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  ChevronRight,
  X,
} from "lucide-react";
import { useSidebarStore } from "@/stores/sidebarStore";
import Button from "@/components/ui/Button";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: <Users className="w-5 h-5" />,
    badge: "24",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    label: "Help",
    href: "/dashboard/help",
    icon: <HelpCircle className="w-5 h-5" />,
  },
];

const Sidebar: React.FC = () => {
  const { isOpen, closeSidebar } = useSidebarStore();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const NavItemComponent: React.FC<{ item: NavItem; isSubmenu?: boolean }> = ({
    item,
    isSubmenu = false,
  }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const expanded = expandedItems.includes(item.label);

    return (
      <div key={item.href}>
        {hasSubmenu ? (
          <button
            onClick={() => toggleSubmenu(item.label)}
            className={clsx(
              "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
              isSubmenu ? "text-sm ml-4" : "text-base",
              expanded || expandedItems.includes(item.label)
                ? "bg-persebaya-bg text-persebaya-primary-hover"
                : "text-persebaya-text hover:bg-persebaya-bg",
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className={clsx("font-medium", !isOpen && "hidden")}>
                {item.label}
              </span>
            </div>
            <ChevronRight
              className={clsx(
                "w-4 h-4 transition-transform",
                expanded && "rotate-90",
              )}
            />
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={() => isMobile && closeSidebar()}
            className={clsx(
              "flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
              isSubmenu ? "text-sm ml-4" : "text-base",
              isActive(item.href)
                ? "bg-persebaya-primary text-white shadow-md border-2 border-persebaya-accent"
                : "text-persebaya-text hover:bg-persebaya-primary-hover border-2 hover:text-white border-persebaya-accent",
            )}
          >
            <div className="flex justify-center  items-center gap-3 flex-1">
              {item.icon}
              <span className={clsx("font-medium", !isOpen && "hidden")}>
                {item.label}
              </span>
            </div>
            {/* {item.badge && isOpen && (
              <span className="bg-persebaya-error text-white text-xs font-bold rounded-full px-2 py-1">
                {item.badge}
              </span>
            )} */}
          </Link>
        )}
        {hasSubmenu && expanded && isOpen && (
          <div className="space-y-1">
            {item.submenu?.map((subitem) => (
              <NavItemComponent key={subitem.href} item={subitem} isSubmenu />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-16 left-0 bottom-0 bg-white shadow-2xl z-30 transition-all duration-300 overflow-y-auto",
          isOpen
            ? isMobile
              ? "w-64"
              : "w-64"
            : isMobile
              ? "-translate-x-full"
              : "w-20",
          isMobile && !isOpen ? "hidden" : "",
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          {isOpen && <h3 className="font-bold text-gray-900">Menu</h3>}
          {isMobile && isOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={closeSidebar}
              className="p-1"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-5 px-2 py-4">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </nav>

        {/* Sidebar Footer */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500">© 2026 FaiSal</p>
            <p className="text-xs text-gray-400">v1.0.0</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
