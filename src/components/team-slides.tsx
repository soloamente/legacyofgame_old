import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useId } from "react";

export type TeamPerson = {
  name: string;
  role: string;
  img: string;
  color: string;
};

type Props = {
  team: TeamPerson[];
};

export function TeamSlides({ team }: Props) {
  return (
    <div className="flex flex-col justify-center items-center pt-4 gap-10 w-full">
      <h4 className="text-6xl text-white font-orbitron font-black">
        The team
      </h4>
      <Carousel
        className="max-w-screen-2xl z-10 w-full"
        opts={{
          align: "start",
          dragFree: true,
        }}
      >
        <CarouselContent className="gap-8">
          {team.map((t, i) => (
            <CarouselItem key={i} className="basis-[18rem] h-[14rem] sm:basis-[20rem] sm:h-[16rem]">
              <div className="w-full h-full flex flex-col justify-center items-center py-8 px-8 border rounded-3xl select-none gap-2 relative overflow-hidden">
                <img src={t.img} className="w-32 h-auto" />
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-white">{t.name}</h4>
                  <p className="font-normal text-white/60">{t.role}</p>
                </div>

                <SlideBg
                  className="absolute top-0 left-0 w-full h-full object-cover -z-20"
                  color={t.color}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-top-10 left-auto right-14 translate-x-0 -translate-y-full max-lg:hidden" />
        <CarouselNext className="-top-10 left-auto right-0 translate-x-0 -translate-y-full max-lg:hidden" />
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
          cx="0%"
          cy="100%"
          r="100%"
          gradientUnits="userSpaceOnUse"
          gradientTransform=""
        >
          <stop stopColor={color ?? "rgba(144, 0, 255)"} />
          <stop offset="1" stopColor="#010813" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
