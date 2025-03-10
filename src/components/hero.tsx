import ellissiSvg from "@/assets/svg/ellissi.svg";
import { Button } from "./ui/button";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  cta?: {
    label: string;
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  };
  children?: React.ReactNode;
};

export function Hero({ title, subtitle, cta, children }: Props) {
  return (
    <div className="flex justify-center items-center w-full max-w-screen-2xl h-[30vh] sm:h-[45vh] lg:h-[60vh] relative">
      <img
        src={ellissiSvg}
        className="w-[140vw] sm:w-[110vw] lg:w-[120vw] max-w-fit object-fill xl:w-full h-auto absolute -z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 select-none pointer-events-none"
      />
      <div className="z-10 max-w-[60rem] text-center gap-4 sm:gap-8 flex flex-col items-center">
        <h1 className="text-white text-8xl max-[1920px]:text-7xl font-orbitron font-black drop-shadow-heroTitle max-lg:text-6xl max-sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-3xl max-[1920px]:text-xl font-medium">
            {subtitle}
          </p>
        )}
        {cta && (
          <Button size={"big"} className="rounded-2xl" {...(cta.props ?? {})}>
            {cta.label}
          </Button>
        )}
        {children ?? <></>}
      </div>
    </div>
  );
}
