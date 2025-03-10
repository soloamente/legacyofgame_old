import logoSvg from "@/assets/svg/logo.svg";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINK_1 = [
  {
    children: "Home",
    href: "/",
    hash: "home"
  },
  {
    children: "Tokens",
    href: "/",
    hash: "tokens",
  },
  {
    children: "The Team",
    href: "/",
    hash: "team",
  },
];
const NAV_LINK_2 = [
  {
    children: (
      <Button disabled className="max-lg:w-60 lg:px-12 rounded-2xl" variant="outline">
        Buy L
      </Button>
    ),
    href: "/ltoken",
  },
  {
    children: (
      <Button disabled className="max-lg:w-60 lg:px-12 rounded-2xl">Buy LX</Button>
    ),
    href: "/swap",
  },
];

export function Header() {
  return (
    <header className="flex justify-center items-center px-8 py-4 sm:px-12 sm:py-6 w-full z-30 fixed bg-background/60 backdrop-blur-2xl">
      <div className="flex justify-between items-center max-w-screen-2xl flex-1">
        <Link to="/" hash="home">
        <img className="w-10 sm:w-12 lg:w-19 z-50" src={logoSvg} />
        </Link>
        <DesktopMenu />
        <MobileMenu />
      </div>
    </header>
  );
}

function DesktopMenu() {
  return (
    <nav className="flex items-center gap-12 max-lg:hidden">
      <ul className="flex gap-12 text-xl text-white items-center">
        {NAV_LINK_1.map(({ children, href, hash }, i) => (
          <li key={`navlink-1-${i}`}>
            <Link
              to={href}
              hash={hash}
              className="p-4 transition-colors hover:text-white/70"
            >
              {children}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex gap-8 text-xl text-white items-center">
        {NAV_LINK_2.map(({ children, href }, i) => (
          <li key={`navlink-2-${i}`}>
            <Link to={href} className="transition-colors">
              {children}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileMenu() {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <button
        className="grid place-content-center gap-2 lg:hidden z-50 aspect-square p-2 focus-visible:rounded-xl"
        onClick={() => setIsActive((v) => !v)}
      >
        <div
          className={cn(
            "w-8 sm:w-10 h-0.5 sm:h-1 bg-white rounded-full transition-transform duration-300",
            isActive ? "rotate-45 translate-y-[9px] sm:translate-y-[10px]" : "",
          )}
        />
        <div
          className={cn(
            "w-8 sm:w-10 bg-white rounded-full transition-transform",
            isActive ? "h-0" : "h-0.5 sm:h-1",
          )}
        />
        <div
          className={cn(
            "w-8 sm:w-10 h-0.5 sm:h-1 bg-white rounded-full transition-transform duration-300",
            isActive ? "-rotate-45 -translate-y-[9px] sm:-translate-y-[10px]" : "",
          )}
        />
      </button>
      <nav
        className={cn(
          "flex items-center gap-20 lg:hidden absolute top-0 pt-[160px] flex-col bg-background w-screen h-screen left-0 transition-[opacity_transform] duration-500",
          isActive
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none",
        )}
      >
        <ul className="flex gap-16 text-2xl text-white items-center flex-col">
          {NAV_LINK_1.map(({ children, href, hash }, i) => (
            <li key={`navlink-1-${i}`}>
              <Link
                to={href}
                hash={hash}
                className="p-4 transition-colors hover:text-white/70"
                onClick={() => setIsActive(false)}
              >
                {children}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-12 text-xl text-white items-center flex-col">
          {NAV_LINK_2.map(({ children, href }, i) => (
            <li key={`navlink-2-${i}`}>
              <Link
                to={href}
                className="transition-colors"
                onClick={() => setIsActive(false)}
              >
                {children}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
