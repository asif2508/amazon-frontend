import {
  Button,
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Providers/UserProvider";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const nav = useNavigate();
  console.log("user", user);

  const handleSignOut = () =>{
    setUser(null)
    localStorage.removeItem('token')
    nav('/login')
  }
  return (
    <Navbar container={"true"} rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Amazon
        </span>
      </NavbarBrand>
      {user ? (
        <Dropdown
          className="h-[50px] w-[50px] rounded-full bg-blue-500 text-white capitalize flex justify-center items-center  md:order-2"
          label={user?.name?.slice(0, 1)}
        >
          <DropdownItem className="bg-gray-500" onClick={() => alert("Dashboard!")}>
            Dashboard
          </DropdownItem>
          <DropdownItem className="bg-gray-500" onClick={() => alert("Settings!")}>
            Settings
          </DropdownItem>
          <DropdownItem className="bg-gray-500" onClick={() => alert("Earnings!")}>
            Earnings
          </DropdownItem>
          <DropdownItem  className="bg-gray-500"onClick={() => handleSignOut()}>
            Sign out
          </DropdownItem>
        </Dropdown>
      ) : (
        <div className="flex md:order-2">
          <Button as={Link} to="/login">
            Login
          </Button>
          <NavbarToggle />
        </div>
      )}
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active>
          Home
        </NavbarLink>
        {user?.role === "admin" && (
          <NavbarLink as={Link} to="/dashboard">
            Dashboard
          </NavbarLink>
        )}
        <NavbarLink href="#">Products</NavbarLink>
        <NavbarLink href="#">About Us</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
