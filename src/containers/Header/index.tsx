import Container from "components/Container";
import IconButton from "components/IconButton";
import Profile from "components/Profile";
import Drawer from "containers/Drawer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDrawer } from "providers/DrawerProvider";
import { useUser } from "providers/UserProvider";
import "twin.macro";

function Header(): JSX.Element {
  const { isOpen, setIsOpen } = useDrawer();

  const { name } = useUser();

  const { pathname } = useRouter();

  return (
    <header tw="py-4 border-b border-opacity-50">
      <Container tw="flex items-center justify-between">
        <div>
          <IconButton
            icon={isOpen ? "menu_open" : "menu"}
            variant="outlined"
            onClick={() => setIsOpen((wasOpen) => !wasOpen)}
          />
          {isOpen && <Drawer />}
        </div>

        <div tw="-m-2">
          <Link href="/profile" passHref>
            <Profile isActive={pathname === "/profile"} name={name} />
          </Link>
        </div>
      </Container>
    </header>
  );
}

export default Header;
