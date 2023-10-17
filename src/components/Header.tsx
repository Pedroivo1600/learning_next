import Link from "next/link";
import { Nav, Navbar } from "reactstrap";

const Header = () => {
  return (
    <Navbar container="md" color="dark" dark>
      <Link legacyBehavior href="/" passHref>
        <a className="navbar-brand">
          Início
        </a>
      </Link>
      <Nav className="flex-row" navbar>
        <Link legacyBehavior href="/products">
          <a className="nav-link me-2">
            Produtos
          </a>
        </Link>
        <Link legacyBehavior href="/cart">
          <a className="nav-link">
            Carrinho
          </a>
        </Link>
      </Nav>
    </Navbar>
  )
}

export default Header