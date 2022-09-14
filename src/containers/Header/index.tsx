import Container from "components/Container";
import MenuLink from "components/MenuLink";
import Profile from "components/Profile";
import Link from "next/link";
import "twin.macro";

function Header(): JSX.Element {
  return (
    <header tw="py-4 border-b border-opacity-50">
      <Container tw="flex items-center justify-between">
        <div tw="-m-2">
          <Link href="/profile" passHref>
            <Profile />
          </Link>
        </div>

        <nav>
          <ul tw="flex gap-6">
            <li>
              <Link href="/" passHref>
                <MenuLink>Início</MenuLink>
              </Link>
            </li>
            <li>
              <Link href="/diet" passHref>
                <MenuLink>Dieta</MenuLink>
              </Link>
            </li>
            <li>
              <Link href="/recipes" passHref>
                <MenuLink>Receitas</MenuLink>
              </Link>
            </li>
            <li>
              <Link href="/foods" passHref>
                <MenuLink>Comidas</MenuLink>
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
