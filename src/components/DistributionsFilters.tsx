import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { endOfMonth, format, startOfMonth, subDays, subHours } from "date-fns";
import {
  ArrowUpDown,
  CalendarIcon,
  ChevronDown,
  Filter,
  RotateCcw,
  X,
} from "lucide-react";
import { useState } from "react";
import { Filters } from "./DistributionsContent";

interface FiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

interface StatusOption {
  value: string;
  label: string;
  color: string;
}

interface PriorityOption {
  value: string;
  label: string;
  icon: string;
}

interface DatePreset {
  label: string;
  value: string;
}

interface SortOption {
  value: string;
  label: string;
}

const statusOptions: StatusOption[] = [
  { value: "provisioning", label: "Provisioning", color: "bg-blue-500" },
  { value: "active", label: "Active", color: "bg-green-500" },
  { value: "suspended", label: "Suspended", color: "bg-red-500" },
  { value: "disabled", label: "Inactive", color: "bg-orange-500" },
];

const priorityOptions: PriorityOption[] = [
  { value: "high", label: "High", icon: "↑" },
  { value: "medium", label: "Medium", icon: "→" },
  { value: "low", label: "Low", icon: "↓" },
];

const datePresets: DatePreset[] = [
  { label: "All Time", value: "all" },
  { label: "Last 8 Hours", value: "8h" },
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "This Month", value: "month" },
  { label: "Custom Date Range", value: "custom" },
];

const sortOptions: SortOption[] = [
  { value: "-created_at", label: "Created At (Newest)" },
  { value: "created_at", label: "Created At (Oldest)" },
  { value: "-updated_at", label: "Updated At (Newest)" },
  { value: "updated_at", label: "Updated At (Oldest)" },
  { value: "name", label: "Name (A-Z)" },
  { value: "-name", label: "Name (Z-A)" },
];

const DistributionsFilters = ({ filters, onFiltersChange }: FiltersProps) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    filters.status ? filters.status.split(",") : []
  );
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(
    filters.priority ? filters.priority.split(",") : []
  );
  const [datePreset, setDatePreset] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [timeRange, setTimeRange] = useState({ start: "00:00", end: "00:00" });

  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value, page: 1 });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...selectedStatuses, status]
      : selectedStatuses.filter((s) => s !== status);
    setSelectedStatuses(newStatuses);
    updateFilter("status", newStatuses.join(","));
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    const newPriorities = checked
      ? [...selectedPriorities, priority]
      : selectedPriorities.filter((p) => p !== priority);
    setSelectedPriorities(newPriorities);
    updateFilter("priority", newPriorities.join(","));
  };

  const handleDatePresetChange = (preset: string) => {
    setDatePreset(preset);
    const now = new Date();

    switch (preset) {
      case "8h":
        updateFilter("dateFrom", subHours(now, 8).toISOString());
        updateFilter("dateTo", now.toISOString());
        break;
      case "24h":
        updateFilter("dateFrom", subHours(now, 24).toISOString());
        updateFilter("dateTo", now.toISOString());
        break;
      case "7d":
        updateFilter("dateFrom", subDays(now, 7).toISOString());
        updateFilter("dateTo", now.toISOString());
        break;
      case "30d":
        updateFilter("dateFrom", subDays(now, 30).toISOString());
        updateFilter("dateTo", now.toISOString());
        break;
      case "month":
        updateFilter("dateFrom", startOfMonth(now).toISOString());
        updateFilter("dateTo", endOfMonth(now).toISOString());
        break;
      case "all":
        updateFilter("dateFrom", "");
        updateFilter("dateTo", "");
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setSelectedStatuses([]);
    setSelectedPriorities([]);
    setDatePreset("all");
    setDateRange({});
    onFiltersChange({
      ...filters,
      status: "",
      priority: "",
      dateFrom: "",
      dateTo: "",
      cname: "",
      page: 1,
    });
  };

  const hasActiveFilters =
    filters.status || filters.priority || filters.dateFrom || filters.cname;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 max-w-full sm:max-w-sm">
          <Input
            placeholder="Search titles..."
            value={filters.cname}
            onChange={(e) => updateFilter("cname", e.target.value)}
            className="h-9"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 h-9 bg-transparent flex-shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="hidden sm:inline">Status</span>
                <span className="sm:hidden">Status</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="start">
              <div className="p-3">
                <div className="relative mb-3">
                  <Input placeholder="Status" className="pl-8 h-8" />
                  <Filter className="absolute left-2.5 top-2 h-3 w-3 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={option.value}
                        checked={selectedStatuses.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleStatusChange(option.value, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={option.value}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${option.color}`}
                        />
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 h-9 bg-transparent flex-shrink-0"
              >
                <CalendarIcon className="h-3 w-3" />
                <span className="hidden md:inline">
                  {filters.dateFrom && filters.dateTo
                    ? `${format(
                        new Date(filters.dateFrom),
                        "MMM d, yyyy"
                      )} - ${format(new Date(filters.dateTo), "MMM d, yyyy")}`
                    : "Created At"}
                </span>
                <span className="md:hidden">
                  {filters.dateFrom && filters.dateTo
                    ? `${format(
                        new Date(filters.dateFrom),
                        "MMM d"
                      )} - ${format(new Date(filters.dateTo), "MMM d")}`
                    : "Date"}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-4">
                <div className="space-y-3">
                  {datePresets.map((preset) => (
                    <div
                      key={preset.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={preset.value}
                        checked={datePreset === preset.value}
                        onCheckedChange={() =>
                          handleDatePresetChange(preset.value)
                        }
                      />
                      <label
                        htmlFor={preset.value}
                        className="text-sm cursor-pointer"
                      >
                        {preset.label}
                      </label>
                    </div>
                  ))}
                </div>

                {datePreset === "custom" && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CalendarComponent
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) =>
                          setDateRange((prev) => ({ ...prev, from: date }))
                        }
                        className="rounded-md border"
                      />
                      <CalendarComponent
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) =>
                          setDateRange((prev) => ({ ...prev, to: date }))
                        }
                        className="rounded-md border"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Start Time
                        </label>
                        <Input
                          type="time"
                          value={timeRange.start}
                          onChange={(e) =>
                            setTimeRange((prev) => ({
                              ...prev,
                              start: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">
                          End Time
                        </label>
                        <Input
                          type="time"
                          value={timeRange.end}
                          onChange={(e) =>
                            setTimeRange((prev) => ({
                              ...prev,
                              end: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Apply Filter
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 h-9 bg-transparent flex-shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="hidden sm:inline">Priority</span>
                <span className="sm:hidden">Priority</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" align="start">
              <div className="p-3">
                <div className="relative mb-3">
                  <Input placeholder="Priority" className="pl-8 h-8" />
                  <Filter className="absolute left-2.5 top-2 h-3 w-3 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {priorityOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`priority-${option.value}`}
                        checked={selectedPriorities.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handlePriorityChange(option.value, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`priority-${option.value}`}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <span className="font-mono text-xs">{option.icon}</span>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="gap-2 h-9 bg-transparent flex-shrink-0"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}

          <Select
            value={filters.sort}
            onValueChange={(value) => updateFilter("sort", value)}
          >
            <SelectTrigger className="w-auto gap-2 h-9 flex-shrink-0">
              <ArrowUpDown className="h-3 w-3" />
              <span className="hidden sm:inline">Sort</span>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          {selectedStatuses.map((status) => {
            const statusConfig = statusOptions.find((s) => s.value === status);
            return (
              <Badge key={status} variant="secondary" className="gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${statusConfig?.color}`}
                />
                {statusConfig?.label}
                <button
                  onClick={() => handleStatusChange(status, false)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}

          {selectedPriorities.map((priority) => {
            const priorityConfig = priorityOptions.find(
              (p) => p.value === priority
            );
            return (
              <Badge key={priority} variant="secondary" className="gap-1">
                <span className="font-mono text-xs">
                  {priorityConfig?.icon}
                </span>
                {priorityConfig?.label}
                <button
                  onClick={() => handlePriorityChange(priority, false)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}

          {filters.dateFrom && (
            <Badge variant="secondary" className="gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span className="hidden sm:inline">
                {format(new Date(filters.dateFrom), "MMM d")} -{" "}
                {format(new Date(filters.dateTo), "MMM d")}
              </span>
              <span className="sm:hidden">
                {format(new Date(filters.dateFrom), "M/d")} -{" "}
                {format(new Date(filters.dateTo), "M/d")}
              </span>
              <button
                onClick={() => {
                  updateFilter("dateFrom", "");
                  updateFilter("dateTo", "");
                  setDatePreset("all");
                }}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export { DistributionsFilters };
