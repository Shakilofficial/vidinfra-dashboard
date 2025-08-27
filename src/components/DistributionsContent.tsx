"use client";
import { useState } from "react";
import { DistributionsFilters } from "./DistributionsFilters";
import { DistributionsTable } from "./DistributionsTable";

export interface Filters {
  status: string;
  cname: string;
  dateFrom: string;
  dateTo: string;
  priority: string;
  page: number;
  limit: number;
  sort: string;
}

const initialFilters: Filters = {
  status: "",
  cname: "",
  dateFrom: "",
  dateTo: "",
  priority: "",
  page: 1,
  limit: 10,
  sort: "-created_at",
};

const DistributionsContent = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Distributions
        </h1>
        <p className="text-muted-foreground">
          Recently created CDN distributions from this organization.
        </p>
      </div>

      <DistributionsFilters filters={filters} onFiltersChange={setFilters} />
      <DistributionsTable filters={filters} onFiltersChange={setFilters} />
    </div>
  );
};

export { DistributionsContent };
