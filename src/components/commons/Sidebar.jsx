"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiChartPie, HiShoppingBag, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

export function CustomSidebar() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem as={Link} to={"/dashboard/"} icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem as={Link} to={"/dashboard/manage-users"} icon={HiUser}>
            Manage Users
          </SidebarItem>
          <SidebarItem
            as={Link}
            to={"/dashboard/manage-products"}
            icon={HiShoppingBag}
          >
            Manage Products
          </SidebarItem>
          <SidebarItem
            as={Link}
            to={"/dashboard/manage-orders"}
            icon={HiShoppingBag}
          >
            Manage Orders
          </SidebarItem>
          <SidebarItem
            as={Link}
            to={"/dashboard/manage-categories"}
            icon={HiShoppingBag}
          >
            Manage Categories
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
