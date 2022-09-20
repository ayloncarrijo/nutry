import Container from "components/Container";
import IconButton from "components/IconButton";
import Profile from "components/Profile";
import Drawer from "containers/Drawer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDrawer } from "providers/DrawerProvider";
import { useUser } from "providers/UserProvider";
import React from "react";
import "twin.macro";
import tw from "twin.macro";

function Header(): JSX.Element {
  const [isVisible, setIsVisible] = React.useState(true);

  const { isOpen, setIsOpen } = useDrawer();

  const { pathname, back } = useRouter();

  const { name } = useUser();

  const wrapperRef = React.useRef<HTMLElement>(null);

  const prevScroll = React.useRef(0);

  React.useEffect(() => {
    prevScroll.current = window.scrollY;

    const handleScroll = () => {
      if (!wrapperRef.current) {
        return;
      }

      setIsVisible(
        window.scrollY < wrapperRef.current.offsetHeight ||
          prevScroll.current > window.scrollY
      );

      prevScroll.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isOpen && <Drawer />}

      <header
        ref={wrapperRef}
        tw="z-40 sticky top-0 bg-gray-900 py-4 border-b border-opacity-50 transition-transform"
        css={[!isVisible && tw`-translate-y-full`]}
      >
        <Container tw="flex items-center justify-between">
          <div tw="flex gap-2">
            {pathname !== "/" && (
              <IconButton
                icon="chevron_left"
                variant="outlined"
                onClick={back}
              />
            )}

            <IconButton
              icon={isOpen ? "menu_open" : "menu"}
              variant="outlined"
              onClick={() => setIsOpen((wasOpen) => !wasOpen)}
            />
          </div>

          <div tw="-m-2">
            <Link href="/profile" passHref>
              <Profile isActive={pathname === "/profile"} name={name} />
            </Link>
          </div>
        </Container>
      </header>
    </>
  );
}

export default Header;
