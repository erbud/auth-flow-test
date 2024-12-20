"use client";

import { useAuthContext } from "@/hooks/useAuthContext";
import { usePathname, useRouter } from "next/navigation";
import { IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import { GoTrophy } from "react-icons/go";
import { SidebarType, SidebarItemType } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function SidebarMenu({ show, setter }: SidebarType) {
  const pathname = usePathname();
  const router = useRouter();
  const { setLogged } = useAuthContext();
  const className = "bg-slate-800 w-[250px] transition-[margin-left] ease-in-out duration-500 fixed top-0 bottom-0 left-0 z-40";
  const appendClass = (show) ? " ml-0" : " ml-[-250px]";

  const MenuItem = ({ icon, name, route, callback }: SidebarItemType) => {
    const colorClass = (pathname) === route ? "text-white" : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
          callback && callback();
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">
          {icon}
        </div>
        <div>{name}</div>
      </Link>
    );
  };

  const ModalOverlay = () => (
    <div
      className="flex fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30"
      onClick={() => {
        setter((oldVal: boolean) => !oldVal);
      }}
    />
  );

  return (
    <>
      <nav className={`${className}${appendClass}`}>
        <div className="sidebar-menu flex flex-col">
          <Image
            className="min-w-24 mx-auto my-5"
            src="/img/icon-balls.png"
            width={80}
            height={30}
            alt="decompeti.com"
            priority
          />
          <MenuItem
            name="Mis competiciones"
            route="/my-competitions"
            icon={<GoTrophy />}
          />
          <MenuItem
            name="Ajustes"
            route="/settings"
            icon={<IoSettingsOutline />}
          />
          <MenuItem
            name="Cerrar sessión"
            route=""
            icon={<IoExitOutline />}
            callback={async () => {
              const response = await fetch("/api/auth/log-out");
              
              if (response.ok) {
                setLogged(false);
                router.replace("/sign-in");
              }
            }}
          />
        </div>
      </nav>
      {(show) ? <ModalOverlay /> : <></>}
    </>
  );
}