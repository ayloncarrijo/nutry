import Header from "containers/Header";
import "twin.macro";

function UserLayout({ children }: React.PropsWithChildren): JSX.Element {
  return (
    <div tw="grid gap-8">
      <Header />

      <main>{children}</main>
    </div>
  );
}

export default UserLayout;
