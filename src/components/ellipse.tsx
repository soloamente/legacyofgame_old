import ellipseSvg from "@/assets/svg/ellipse-under-hero.svg";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLImageElement>;

export function Ellipse({className, ...props}:Props) {
  return (
    <img
      src={ellipseSvg}
      className={cn("-z-50 max-w-fit w-[130vw] sm:w-[110vw] lg:w-[100vw] xl:w-full h-auto absolute top-0 left-1/2 -translate-x-1/2", className)}
      {...props}
    />
  );
}
