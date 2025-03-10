import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Ellipse } from "./ellipse";

export type Slide = {
  name: string;
  desc?: string;
  color?: string;
  img?: string;
  opacity?: number;
  href?: string;
};

type Props = {
  slides: Slide[];
  showEllipse?: boolean;
};

export function GameSlides({ slides, showEllipse }: Props) {
  return (
    <div className="relative w-full flex justify-center items-center pt-4">
      {showEllipse && (
        <Ellipse className="lg:-top-20" />
      )}

      <Carousel
        className="pt-10 max-w-screen-2xl z-10 w-full"
        opts={{
          align: "start",
          dragFree: true,
        }}
      >
        <CarouselContent className="gap-4 mt-4">
          {slides.map((s, i) => (
            <CarouselItem
              key={i}
              className="basis-[18rem] h-[24rem] sm:basis-[26rem] sm:h-[33rem] relative "
              style={{ opacity: s.opacity ?? 1 }}
            >
              <Link
                to={s.href ?? undefined}
                className={cn(
                  "peer w-[16rem] h-[22rem] sm:w-[21rem] sm:h-[28rem] flex flex-col justify-start items-start py-8 px-8 border rounded-3xl select-none relative overflow-hidden transition-all ease-out duration-500",
                  s.opacity === 1 ? "hover:shadow-gameCardHover hover:border-[#FE67FF]" : "",
                )}
              >
                <h4 className="text-xl font-semibold text-white">{s.name}</h4>
                {s.desc && (
                  <p className="font-normal text-white/60">{s.desc}</p>
                )}
                <SlideBg
                  className="absolute top-0 left-0 w-full h-full object-cover -z-20"
                  color={s.color}
                />
              </Link>
              {s.img && (
                <img
                  src={s.img}
                  className={cn(
                    "pointer-events-none -right-6 sm:right-0 bottom-0 absolute h-[17rem] sm:h-[27rem] w-auto object-contain select-none transition-all ease-out duration-500",
                    s.opacity === 1
                      ? "peer-hover:drop-shadow-gameCardImageHover"
                      : "",
                  )}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-0 left-auto right-14 translate-x-0 translate-y-0 max-lg:hidden" />
        <CarouselNext className="top-0 left-auto right-0 translate-x-0 translate-y-0 max-lg:hidden" />
      </Carousel>
    </div>
  );
}

function SlideBg({ className, color }: { className?: string; color?: string }) {
  const id = useId();
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <defs>
        <radialGradient
          id={id}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(357.261 472.859) rotate(-123.477) scale(509.067 400.3)"
        >
          <stop stop-color={color ?? "rgba(144, 0, 255, 0.7)"} />
          <stop offset="1" stop-color="#1C273A" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
