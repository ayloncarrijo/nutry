import Container from "components/Container";
import Pagination from "components/Pagination";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import React from "react";
import type { AppPage } from "types";

const Page: AppPage = () => {
  const [currentPage, setCurrentPage] = React.useState(0);

  return (
    <Container>
      <div>
        <Pagination
          totalPages={10}
          page={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = authenticate;
export default Page;
