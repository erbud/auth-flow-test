"use client";

import { FiMenu as Icon } from "react-icons/fi";
import { SidebarButtonType } from "@/lib/definitions";

export default function SidebarButton({ setter }: SidebarButtonType) {
  return (
    <>
      <button
        className="mr-2 text-4xl text-black"
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
      >
        <Icon />
      </button>
    </>
  );
}