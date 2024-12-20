"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/components/auth/Provider";
import SidebarButton from "@/components/nav/SidebarButton";
import SidebarMenu from "@/components/nav/SidebarMenu";

export default function Sidebar() {
  const { logged } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return logged && (
    <>
      <SidebarButton setter={setShowSidebar} />
      <SidebarMenu show={showSidebar} setter={setShowSidebar} />
    </>
  );
}