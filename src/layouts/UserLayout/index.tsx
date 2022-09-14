import Header from "containers/Header";

function UserLayout({ children }: React.PropsWithChildren): JSX.Element {
  return (
    <div>
      <Header />

      <div>{children}</div>
    </div>
  );
}

export default UserLayout;
