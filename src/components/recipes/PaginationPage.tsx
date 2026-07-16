"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationPageProps {
  totalRecipe?: number;
}

export function PaginationPage({ totalRecipe = 0 }: PaginationPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Directly read page from URL (Fallback to 1 if not a valid number)
  const page = Number(searchParams.get('page')) || 1;
  
  const totalItems = totalRecipe;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1; // 0 হলে যেন অন্তত ১টি পেজ থাকে

  // 2. Pure function to handle page change without triggering side effects
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString()); // URLSearchParams এ সবসময় string সেট করতে হয়
    router.push(`?${params.toString()}`);
  };

  // 3. Strongly typed page numbers array (string for 'ellipsis', number for page numbers)
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 1) return [1];

    const pages: (number | string)[] = [];
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <Pagination className="w-full">
      <Pagination.Summary>
        Showing {startItem}-{endItem} of {totalItems} results
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous 
            isDisabled={page === 1 || totalItems === 0} 
            onPress={() => handlePageChange(page - 1)}
          >
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link 
                isActive={p === page} 
                onPress={() => handlePageChange(p as number)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          )
        )}

        <Pagination.Item>
          <Pagination.Next 
            isDisabled={page === totalPages || totalItems === 0} 
            onPress={() => handlePageChange(page + 1)}
          >
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
