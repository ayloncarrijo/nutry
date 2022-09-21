import Container from "components/Container";
import DietViewer from "components/DietViewer";
import Selectable from "components/Selectable";
import SnackCard from "components/SnackCard";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import React from "react";
import "twin.macro";
import type { AppPage } from "types";
import type { FullDiet } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  initialState: {
    dailyDiet: FullDiet;
  };
}

const Page: AppPage<PageProps> = ({ initialState }) => {
  const [dailyDiet, setDailyDiet] = React.useState(initialState.dailyDiet);

  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <Container>
      <DietViewer diet={dailyDiet} onDietChange={setDailyDiet} />

      <div tw="grid grid-cols-1 gap-4 my-8">
        <Selectable
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        >
          <SnackCard
            carbohydrates={10}
            fats={10}
            measurement="G"
            name="Amendoim"
            proportion={100}
            proteins={10}
          />
        </Selectable>

        <Selectable
          checked={false}
          onChange={() => {
            //
          }}
        >
          <SnackCard
            carbohydrates={10}
            fats={10}
            measurement="G"
            name="Amendoim"
            proportion={100}
            proteins={10}
          />
        </Selectable>

        <Selectable
          checked={false}
          onChange={() => {
            //
          }}
        >
          <SnackCard
            carbohydrates={10}
            fats={10}
            measurement="G"
            name="Amendoim"
            proportion={100}
            proteins={10}
          />
        </Selectable>
      </div>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp(
  [authenticate],
  ([{ user }]) =>
    async () => {
      const { data: dailyDiet } = await Api.MAIN.get<FullDiet>(
        `/diets/${user.dailyDietId}`
      );

      const props: PageProps = {
        initialState: {
          dailyDiet,
        },
      };

      return {
        props,
      };
    }
);
export default Page;
