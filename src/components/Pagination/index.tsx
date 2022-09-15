import IconButton from "components/IconButton";
import PaginationButton from "components/Pagination/PaginationButton";
import "twin.macro";

interface PaginationProps {
  onPageChange: (page: number) => void;
  page: number;
  totalPages: number;
}

function Pagination({
  onPageChange,
  page,
  totalPages,
}: PaginationProps): JSX.Element {
  return (
    <div tw="flex items-center gap-1">
      <IconButton icon="chevron_left" />

      <PaginationButton>...</PaginationButton>
      <PaginationButton>1</PaginationButton>
      <PaginationButton isActive>2</PaginationButton>
      <PaginationButton>3</PaginationButton>
      <PaginationButton>...</PaginationButton>

      <IconButton icon="chevron_right" />
    </div>
  );
}

export default Pagination;
