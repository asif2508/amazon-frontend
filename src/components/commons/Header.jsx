
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar container={"true"} rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Amazon</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button as={Link} to='/login' >Login</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">Products</NavbarLink>
        <NavbarLink href="#">About Us</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header