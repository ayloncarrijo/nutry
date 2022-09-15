import IconButton from "components/IconButton";
import PaginationButton from "components/Pagination/PaginationButton";
import "twin.macro";

interface PaginationProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  visiblePages?: number;
}

function Pagination({
  onPageChange,
  currentPage,
  totalPages,
  visiblePages = 5,
}: PaginationProps): JSX.Element {
  const isFirstPage = currentPage === 1;

  const isLastPage = currentPage === totalPages;

  const initialPage = Math.min(
    Math.max(currentPage - Math.floor(visiblePages / 2), 1),
    Math.abs(totalPages - visiblePages) + 1
  );

  return (
    <div tw="flex items-center gap-1">
      <IconButton
        icon="first_page"
        size="sm"
        disabled={isFirstPage}
        onClick={() => onPageChange(1)}
      />

      <IconButton
        icon="chevron_left"
        size="sm"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {Array(Math.min(totalPages, visiblePages))
        .fill(null)
        .map((_, index) => {
          const pageNumber = initialPage + index;

          return (
            <PaginationButton
              key={pageNumber}
              isActive={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationButton>
          );
        })}

      <IconButton
        icon="chevron_right"
        size="sm"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
      />

      <IconButton
        icon="last_page"
        size="sm"
        disabled={isLastPage}
        onClick={() => onPageChange(totalPages)}
      />
    </div>
  );
}

export default Pagination;
