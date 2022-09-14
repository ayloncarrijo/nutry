import Container from "components/Container";
import UserLayout from "layouts/UserLayout";
import type { AppPage } from "types";

const HomePage: AppPage = () => {
  return <Container>Home</Container>;
};

HomePage.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default HomePage;
