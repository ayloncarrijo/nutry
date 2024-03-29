import IconButton from "components/IconButton";
import PaginationButton from "components/Pagination/PaginationButton";
import React from "react";
import "twin.macro";

interface PaginationProps {
  onPageChange: (page: number) => void;
  maximumPage: number;
  currentPage: number;
  visiblePages?: number;
}

function Pagination({
  onPageChange,
  maximumPage,
  currentPage,
  visiblePages = 3,
}: PaginationProps): JSX.Element {
  const isFirstPage = currentPage === 1;

  const isLastPage = currentPage === maximumPage;

  const initialPage =
    maximumPage < visiblePages
      ? 1
      : Math.min(
          Math.max(currentPage - Math.floor(visiblePages / 2), 1),
          maximumPage - visiblePages + 1
        );

  const goToPage = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <div tw="flex items-center gap-1">
      <IconButton
        icon="first_page"
        size="sm"
        disabled={isFirstPage}
        onClick={() => goToPage(1)}
      />

      <IconButton
        icon="chevron_left"
        size="sm"
        disabled={isFirstPage}
        onClick={() => goToPage(currentPage - 1)}
      />

      {Array(Math.min(maximumPage, visiblePages))
        .fill(null)
        .map((_, index) => {
          const thisPage = initialPage + index;

          return (
            <PaginationButton
              key={thisPage}
              isActive={thisPage === currentPage}
              onClick={() => goToPage(thisPage)}
            >
              {thisPage}
            </PaginationButton>
          );
        })}

      <IconButton
        icon="chevron_right"
        size="sm"
        disabled={isLastPage}
        onClick={() => goToPage(currentPage + 1)}
      />

      <IconButton
        icon="last_page"
        size="sm"
        disabled={isLastPage}
        onClick={() => goToPage(maximumPage)}
      />
    </div>
  );
}

const usePagination = () => {
  const [maximumPage, setMaximumPage] = React.useState(0);

  const [currentPage, setCurrentPage] = React.useState(1);

  return {
    maximumPage,
    setMaximumPage,
    currentPage,
    setCurrentPage,
  };
};

export { usePagination };
export default Pagination;
