import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Providers/UserProvider";

function Header() {
  const { user } = useContext(UserContext);
  return (
    <Navbar container={"true"} rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Amazon
        </span>
      </NavbarBrand>
      {user ? (
        <div className="h-[50px] w-[50px] rounded-full bg-blue-500 text-white capitalize flex justify-center items-center  md:order-2">
          {user?.name?.slice(0, 1)}
        </div>
      ) : (
        <div className="flex md:order-2">
          <Button as={Link} to="/login">
            Login
          </Button>
          <NavbarToggle />
        </div>
      )}
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

export default Header;
