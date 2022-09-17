import Container from "components/Container";
import NavLink from "components/NavLink";
import Profile from "components/Profile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "providers/UserProvider";
import "twin.macro";

function Header(): JSX.Element {
  const { pathname } = useRouter();

  const { name } = useUser();

  return (
    <header tw="py-4 border-b border-opacity-50">
      <Container tw="flex items-center justify-between">
        <div tw="-m-2">
          <Link href="/profile" passHref>
            <Profile isActive={pathname === "/profile"} name={name} />
          </Link>
        </div>

        <nav>
          <ul tw="flex gap-6">
            {[
              {
                label: "Início",
                href: "/",
              },
              {
                label: "Dieta",
                href: "/diet",
              },
              {
                label: "Receitas",
                href: "/recipes",
              },
              {
                label: "Comidas",
                href: "/foods",
              },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} passHref>
                  <NavLink isActive={pathname === href}>{label}</NavLink>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
