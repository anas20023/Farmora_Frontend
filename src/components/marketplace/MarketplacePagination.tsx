"use client";

import { Pagination } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MarketplacePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export default function MarketplacePagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: MarketplacePaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipses
  const generatePages = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = generatePages();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-xs text-muted">
      <div>
        Showing <span className="font-semibold text-foreground">{startItem}</span> to{" "}
        <span className="font-semibold text-foreground">{endItem}</span> of{" "}
        <span className="font-semibold text-foreground">{totalItems}</span> crop listings
      </div>

      <Pagination aria-label="Marketplace page navigation">
        <Pagination.Content className="flex items-center gap-1">
          {/* Previous Button */}
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="flex items-center gap-1 rounded border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground hover:bg-surface-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="size-3.5" />
              <span className="hidden sm:inline">Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {/* Page Numbers */}
          {pages.map((item, idx) => {
            if (item === "ellipsis") {
              return (
                <Pagination.Item key={`ellipsis-${idx}`}>
                  <Pagination.Ellipsis className="px-2 text-muted">...</Pagination.Ellipsis>
                </Pagination.Item>
              );
            }
            const isActive = item === currentPage;
            return (
              <Pagination.Item key={item}>
                <Pagination.Link
                  isActive={isActive}
                  onClick={() => onPageChange(item)}
                  className={`size-8 rounded flex items-center justify-center font-semibold text-xs transition-colors cursor-pointer ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-2xs font-bold"
                      : "border border-border bg-surface text-foreground hover:bg-surface-secondary"
                  }`}
                >
                  {item}
                </Pagination.Link>
              </Pagination.Item>
            );
          })}

          {/* Next Button */}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="flex items-center gap-1 rounded border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground hover:bg-surface-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="size-3.5" />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}
