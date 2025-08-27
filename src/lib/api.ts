import { Filters } from "@/components/DistributionsContent";

const base_url = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchDistributions = async (filters: Filters) => {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.sort) params.append("sort", filters.sort);
  if (filters.status) params.append("filter[status][eq]", filters.status);
  if (filters.cname) params.append("filter[name][like]", filters.cname);

  const response = await fetch(`${base_url}/distributions?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch distributions");
  }

  return response.json();
};
