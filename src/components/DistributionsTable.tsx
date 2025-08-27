/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchDistributions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Ban,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Globe,
  MoreHorizontal,
  Settings,
  Trash2,
} from "lucide-react";
import { Filters } from "./DistributionsContent";

interface Distribution {
  id: string;
  name: string;
  domain: string;
  status: "active" | "provisioning" | "disabled" | "suspended";
  created_at: string;
  updated_at: string;
  cache_strategy: string;
  domain_type: string;
}

interface FiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const columnHelper = createColumnHelper<Distribution>();

const columns: ColumnDef<Distribution, any>[] = [
  columnHelper.accessor("name", {
    header: "Label",
    cell: (info) => (
      <div className="font-medium text-foreground">{info.getValue()}</div>
    ),
  }),
  columnHelper.accessor("domain", {
    header: "Domain",
    cell: (info) => (
      <div className="text-muted-foreground">{info.getValue()}</div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const statusConfig = {
        active: {
          color: "bg-green-100 text-green-800 border-green-200",
          label: "Active",
          dot: "bg-green-500",
        },
        provisioning: {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          label: "Provisioning",
          dot: "bg-blue-500",
        },
        disabled: {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          label: "Inactive",
          dot: "bg-gray-500",
        },
        suspended: {
          color: "bg-red-100 text-red-800 border-red-200",
          label: "Suspended",
          dot: "bg-red-500",
        },
      };
      const config =
        statusConfig[status as keyof typeof statusConfig] ||
        statusConfig.disabled;

      return (
        <Badge variant="outline" className={`${config.color} gap-1.5`}>
          <div className={`w-2 h-2 rounded-full ${config.dot}`} />
          {config.label}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("updated_at", {
    header: "Date Modified",
    cell: (info) => {
      const date = new Date(info.getValue());
      return (
        <div className="text-muted-foreground">
          {format(date, "MMM d, yyyy")}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "time",
    header: "Time",
    cell: (info) => {
      const date = new Date(info.row.original.updated_at);
      return (
        <div className="text-muted-foreground">{format(date, "h:mm a")}</div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="gap-2">
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Trash2 className="h-4 w-4" />
            Purge
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Settings className="h-4 w-4" />
            Manage
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Ban className="h-4 w-4" />
            Disable
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];

const DistributionsTable = ({ filters, onFiltersChange }: FiltersProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["distributions", filters],
    queryFn: () => fetchDistributions(filters),
  });

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.meta?.pagination?.total_pages || 0,
  });

  const updateFilters = (updates: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 p-4">
        <p className="text-destructive">
          Failed to load distributions. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: filters.limit }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Globe className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No distributions found.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {data?.meta?.pagination
            ? `${
                data.meta.pagination.total === 0
                  ? 0
                  : (filters.page - 1) * filters.limit + 1
              }-${Math.min(
                filters.page * filters.limit,
                data.meta.pagination.total
              )} of ${data.meta.pagination.total} row(s) selected.`
            : "0 of 0 row(s) selected."}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={filters.limit.toString()}
              onValueChange={(value) =>
                updateFilters({ limit: Number.parseInt(value), page: 1 })
              }
            >
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              Page {filters.page} of {data?.meta?.pagination?.total_pages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilters({ page: 1 })}
              disabled={filters.page <= 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilters({ page: filters.page - 1 })}
              disabled={filters.page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilters({ page: filters.page + 1 })}
              disabled={
                !data?.meta?.pagination ||
                filters.page >= data.meta.pagination.total_pages
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateFilters({
                  page: data?.meta?.pagination?.total_pages || 1,
                })
              }
              disabled={
                !data?.meta?.pagination ||
                filters.page >= data.meta.pagination.total_pages
              }
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DistributionsTable };
