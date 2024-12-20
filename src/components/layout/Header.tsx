"use client";

import { Londrina_Solid } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/nav/Sidebar";
import UnauthMenu from "@/components/nav/UnauthMenu";

const lodrina = Londrina_Solid({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  const [scrollTop, setScrollTop] = useState<number>(0);
  
  const isSticky = (ev: Event) => {
    const header = document.querySelector('.site-header');
    const scrollTopCurrent = window.scrollY;

    (scrollTopCurrent > 250 && scrollTopCurrent > scrollTop)
      ? header?.classList.add('is-sticky')
      : header?.classList.remove('is-sticky');
  };
  const isScrollEnd = (ev: Event) => {
    setScrollTop(window.scrollY);
  };
  
  useEffect(() => {  
    window.addEventListener('scroll', isSticky);
    window.addEventListener('scrollend', isScrollEnd);
    return () => {
      window.removeEventListener('scroll', isSticky);
      window.removeEventListener('scrollend', isScrollEnd);
    };
  }, [scrollTop]);

  return (
    <header className="site-header fixed top-0 left-0 w-full mt-0 p-4 bg-slate-300 shadow-lg transition-[margin-top] ease-in-out duration-500">
      <div className={`mx-auto flex sm:container sm:px-2`}>
        <Sidebar />
        <div className="flex flex-1">
          <h1 className={`${lodrina.className} text-3xl`}>
            <Link href="/">
              deCompeti
            </Link>
          </h1>
        </div>
        <UnauthMenu />
      </div>
    </header>
  );
}