import logoSvg from "@/assets/svg/logo.svg";

const menus = [
  {
    label: "Socials",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/legacyofgame_official/",
        ext: true,
      },
      {
        label: "Telegram",
        href: "http://t.me/legacyofgame",
        ext: true,
      },
      {
        label: "X",
        href: "https://x.com/LegacyOfGameOff",
        ext: true,
      },
    ],
  },
  {
    label: "More",
    links: [
      {
        label: "Privacy Policy",
        href: "#",
        ext: false,
      },
      {
        label: "Cookie Policy",
        href: "#",
        ext: false,
      },
      {
        label: "White Paper",
        href: "/white-paper.pdf",
        ext: true,
      },
    ],
  },
  {
    label: "Contact Us",
    links: [
      {
        label: "legacyofgame@gmail.com",
        href: "mailto:legacyofgame@gmail.com",
        ext: false,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="flex justify-center items-center max-[400px]:px-4 max-sm:px-8 max-2xl:px-12 py-10 w-full flex-col gap-8">
      <div className="rounded-2xl max-[400px]:px-8 px-12 py-8 flex justify-between items-start max-w-screen-2xl border w-full max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 max-lg:gap-y-16">
        <div className="flex items-center gap-2 flex-1">
          <img className="w-14 h-auto object-contain" src={logoSvg} />
          <div className="flex flex-col justify-end items-start">
            <span className="font-montserrat font-bold text-white text-2xl">
              Legacy
            </span>
            <span className="font-montserrat font-bold text-white text-2xl">
              Of Game
            </span>
          </div>
        </div>
        {menus.map((menu) => (
          <nav className="text-xl flex-1" key={menu.label}>
            <h4 className="text-white font-semibold mb-4">{menu.label}</h4>
            <ul className="flex flex-col gap-4 sm:text-xl text-lg text-white">
              {menu.links.map(({ label, href, ext }, i) => (
                <li key={`navlink-${i}-${label}`} className="truncate">
                  <a
                    className="transition-colors hover:text-white/70"
                    href={href}
                    target={ext ? "_blank" : "_self"}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="text-sm sm:text-xl">Copyright &copy; Protected by Legacy Of Game</p>
    </footer>
  );
}
