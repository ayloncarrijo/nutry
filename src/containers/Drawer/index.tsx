import IconButton from "components/IconButton";
import NavLink from "components/NavLink";
import useBreakpoint from "hooks/useBreakpoint";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDrawer } from "providers/DrawerProvider";
import React from "react";
import "twin.macro";
import { theme } from "twin.macro";

function Drawer(): JSX.Element | null {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const isDesktop = useBreakpoint(theme("screens.xl"));

  const { pathname } = useRouter();

  const { setIsOpen } = useDrawer();

  React.useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      window.document.body.style.paddingLeft = `${
        entries[0]?.target.clientWidth ?? 0
      }px`;
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      window.document.body.style.paddingLeft = "0px";
      observer.disconnect();
    };
  }, [isDesktop]);

  return (
    <>
      {!isDesktop && (
        <div
          tw="z-50 fixed inset-0 bg-black bg-opacity-25"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        ref={wrapperRef}
        tw="z-50 fixed top-0 left-0 bottom-0 shadow-md bg-gray-800 w-64"
      >
        <header tw="p-4 border-b border-opacity-25">
          <div tw="-mx-2">
            <IconButton icon="close" onClick={() => setIsOpen(false)} />
          </div>
        </header>

        <div>
          <nav>
            <ul>
              {[
                {
                  icon: "cottage",
                  label: "Início",
                  href: "/",
                },
                {
                  icon: "fact_check",
                  label: "Dieta",
                  href: "/diet",
                },
                {
                  icon: "list_alt",
                  label: "Receitas",
                  href: "/recipes",
                },
                {
                  icon: "fastfood",
                  label: "Comidas",
                  href: "/foods",
                },
              ].map(({ icon, href, label }) => (
                <li key={href}>
                  <Link href={href} passHref>
                    <NavLink isActive={pathname === href} icon={icon}>
                      {label}
                    </NavLink>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Drawer;
