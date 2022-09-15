import IconButton from "components/IconButton";
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

      <IconButton icon={<div>...</div>} />

      <IconButton icon={<div>1</div>} />
      <IconButton icon={<div>2</div>} />
      <IconButton icon={<div>3</div>} />

      <IconButton icon={<div>...</div>} />

      <IconButton icon="chevron_right" />
    </div>
  );
}

export default Pagination;
