import { Button } from "@/components/ui/button";
import { LayoutGrid, Plus } from "lucide-react";
import Link from "next/link";

const DistributionsHeader = () => (
  <div className="border-b border-border bg-background hidden lg:block">
    <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-4">
      <div className="flex items-center gap-2 text-sm min-w-0">
        <LayoutGrid className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="text-muted-foreground hidden sm:inline">Products</span>
        <span className="text-muted-foreground hidden sm:inline">›</span>
        <Link href="/" className="text-muted-foreground">
          CDN
        </Link>
        <span className="text-muted-foreground">›</span>
        <span className="text-foreground font-medium truncate">
          Distributions
        </span>
      </div>
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 flex-shrink-0 text-sm px-3 sm:px-4">
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Create Distribution</span>
        <span className="sm:hidden">Create</span>
      </Button>
    </div>
  </div>
);

export { DistributionsHeader };
