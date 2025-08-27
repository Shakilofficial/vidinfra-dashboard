"use client";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { useState } from "react";
import { DistributionsContent } from "../DistributionsContent";
import { DistributionsHeader } from "../DistributionsHeader";
import { Sidebar } from "../Sidebar";

const queryClient = new QueryClient();

const DistributionsPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-background">
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <div
          className={`
            fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0
            ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
        </div>

        <main className="flex-1 flex flex-col min-w-0">
          <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">CDN Distributions</h1>
            <div className="w-9" />
          </div>

          <DistributionsHeader />
          <div className="flex-1 p-3 sm:p-4 lg:p-6">
            <DistributionsContent />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default DistributionsPage;
