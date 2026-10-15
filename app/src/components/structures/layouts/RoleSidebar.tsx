import { Button, Label } from "@/components/ui";
import type { NavItem } from "@/types/NavItem";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

export type RoleSidebarProps = {
  label: string;
  items: NavItem[];
};

export function RoleSidebar({ label, items }: RoleSidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "flex min-h-full shrink-0 flex-col border-r border-gray-300 bg-white py-4 transition-[width] duration-200",
        expanded ? "w-60" : "w-16",
      )}
    >
      <div className={cn("flex px-2 justify-between items-center")}>
        <Label className={cn(expanded ? "block" : "hidden")}>{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2"
          aria-label={expanded ? "Recolher navegação" : "Expandir navegação"}
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? (
            <ChevronLeftIcon size={20} />
          ) : (
            <ChevronRightIcon size={20} />
          )}
        </Button>
      </div>
      <nav aria-label={label} className="mt-4 flex flex-col gap-1 px-2">
        {items.map(
          (item) =>
            item.href && (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href.endsWith("dashboard")}
                title={expanded ? undefined : item.name}
                aria-label={expanded ? undefined : item.name}
                className={({ isActive }) =>
                  cn(
                    "flex min-h-11 items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-muted",
                    expanded ? "" : "justify-center px-0",
                    isActive
                      ? "bg-secondary-200 text-secondary-800"
                      : "text-foreground",
                  )
                }
              >
                <span className="flex shrink-0 items-center justify-center">
                  {item.icon}
                </span>
                <span className={expanded ? "truncate" : "hidden"}>
                  {item.name}
                </span>
              </NavLink>
            ),
        )}
      </nav>
    </aside>
  );
}
