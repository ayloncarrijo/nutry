import Container from "components/Container";
import FoodForm from "forms/FoodForm";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import type { AppPage } from "types";

const Page: AppPage = () => {
  return (
    <Container>
      <FoodForm />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = authenticate;
export default Page;
