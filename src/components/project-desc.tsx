import { Button } from "./ui/button";

type Props = {
  file?: {
    label: string;
    href: string;
  };
};

export function ProjectDesc({ file }: Props) {
  return (
    <div className="w-full max-w-screen-2xl flex flex-col justify-center items-center gap-10 relative border p-10 sm:p-16 rounded-3xl overflow-hidden">
      <h4 className="text-4xl sm:text-6xl text-white font-orbitron font-black">
        The project
      </h4>
      <p className="text-lg sm:text-xl font-medium text-justify">
        Legacy of Game is the first platform to introduce a betting system in
        video games, integrating both a proprietary coin and a crypto asset. The
        platform is built around two key elements: "L" and "LX." The "L" coin,
        which can be purchased with real money, allows users to participate in
        challenges and tournaments, while "LX" is an internally developed
        crypto, usable both within the Legacy of Game ecosystem and on
        cryptocurrency markets.
        <br />
        <br />
        This dual structure offers players a flexible and dynamic experience:
        "L" ensures stability for internal transactions, while "LX" provides
        opportunities for interaction with the broader blockchain universe. With
        this innovative solution, Legacy of Game redefines the gaming
        experience, elevating the fusion between gaming and blockchain
        technology to a new level.{" "}
      </p>
      {file && (
        <a href={file.href} target="_blank">
          <Button>{file.label}</Button>
        </a>
      )}

      <svg
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 object-fill -z-20"
      >
        <rect width="100%" height="100%" fill="url(#paint0_radial_79_25)" />
        <defs>
          <radialGradient
            id="paint0_radial_79_25"
            cx="0"
            cy="100%"
            // r="1"
            gradientUnits="userSpaceOnUse"
            // gradientTransform="translate(48.5 715.984) rotate(-49.1824) scale(826.891 872.563)"
          >
            <stop offset="0.00" stopColor="#9000FF" />
            <stop offset="0.37" stopColor="#390660" />
            <stop offset="0.61" stopColor="#210833" />
            <stop offset="1.00" stopColor="#13091A" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
