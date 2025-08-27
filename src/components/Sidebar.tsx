import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ChevronLeft,
  Download,
  Globe,
  HelpCircle,
  MessageSquare,
  Shield,
  Trash2,
  X,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}

const menuItems: MenuItem[] = [
  { icon: Globe, label: "Distributions", active: true },
  { icon: BarChart3, label: "Statistics" },
  { icon: Download, label: "Prefetch" },
  { icon: Trash2, label: "Purge" },
  { icon: Shield, label: "Certificate" },
];

const Sidebar = ({ onClose }: SidebarProps) => (
  <div className="w-64 bg-background border-r border-border flex flex-col h-full">
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">CDN</span>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-6 w-6 lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>

    <div className="flex-1 p-4">
      <div className="space-y-1">
        <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
          General
        </div>
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-9 px-2",
              item.active && "bg-muted text-foreground font-medium"
            )}
            onClick={() => onClose?.()}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>

    <div className="p-4 border-t border-border">
      <div className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-9 px-2 text-muted-foreground"
        >
          <HelpCircle className="h-4 w-4" />
          Support
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-9 px-2 text-muted-foreground"
        >
          <MessageSquare className="h-4 w-4" />
          Feedback
        </Button>
      </div>
    </div>
  </div>
);

export { Sidebar };