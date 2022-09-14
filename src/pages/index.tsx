import Container from "components/Container";
import UserLayout from "layouts/UserLayout";
import type { AppPage } from "types";

const Page: AppPage = () => {
  return <Container>Home</Container>;
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Page;
