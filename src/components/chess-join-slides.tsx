import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Button } from "./ui/button";

export type Slide = {
  prize: number;
  admissionFee: number;
  token: string;

  tierImg: string;
  iconImg: string;
  bgImg: string;
};

type Props = {
  slides: Slide[];
  balance?: number;
  onClick?: (slide: Slide) => void;
};

export function ChessJoinSlides({ slides, balance, onClick }: Props) {
  const sortedSlides = useMemo(
    () => slides.sort((a, b) => a.admissionFee - b.admissionFee),
    [slides],
  );

  const noPlay = !balance || balance < sortedSlides[0].admissionFee;

  return (
    <div className="relative w-full flex flex-col gap-16 justify-center items-center pt-4">
      <Carousel
        className="pt-10 max-w-screen-2xl z-10"
        opts={{
          align: "center",
          dragFree: false,
          loop: true,
          startIndex: 0,
        }}
      >
        <CarouselContent className="mt-4 -ml-0 sm:-ml-2">
          {sortedSlides.map((s, i) => (
            <CarouselItem
              key={i}
              className="max-[400px]:basis-[18rem] basis-[22rem] h-[18rem] sm:basis-[42rem] sm:h-[28rem] lg:basis-[54rem] lg:h-[36rem] relative flex flex-col p-6 sm:p-8 items-center justify-start gap-2 sm:gap-4 mx-3 sm:mx-4 lg:mx-8 select-none"
            >
              <Button
                className="order-last peer disabled:grayscale disabled:cursor-not-allowed max-sm:py-2 max-sm:text-base"
                // this item is set order-last otherwise peer modifier doesn't work on previous element
                onClick={() => onClick?.(s)}
                disabled={!balance || balance < s.admissionFee}
              >
                Play
              </Button>

              <div className="w-full flex items-center justify-center gap-8 sm:pt-2 lg:pt-12 peer-disabled:grayscale">
                <img src={s.tierImg} className="w-1/2 sm:w-72 lg:w-[500px] h-auto" />
                <img src={s.iconImg} className="w-20 h-auto sm:w-auto sm:h-full" />
              </div>
              <div className="w-full py-2 sm:py-4 lg:py-8 text-center text-white font-extrabold text-lg sm:text-3xl bg-black/50 rounded-2xl">
                <p>
                  Prize: {s.prize} {s.token}
                </p>
              </div>
              <p className="font-extrabold text-white text-lg">
                Admission Fee: {s.admissionFee} {s.token}
              </p>

              <img
                src={s.bgImg}
                className={cn(
                  "pointer-events-none top-0 left-0 absolute h-full w-full select-none object-fill -z-10 peer-disabled:grayscale",
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-0 left-auto right-14 translate-x-0 translate-y-0 max-lg:hidden" />
        <CarouselNext className="top-0 left-auto right-0 translate-x-0 translate-y-0 max-lg:hidden" />
      </Carousel>

      <p
        className="text-xl font-bold text-white select-none transition-opacity ease-out"
        style={{ opacity: noPlay ? 1 : 0 }}
      >
        {balance !== undefined
          ? "You don't have enough token to play."
          : "You must login to play."}
      </p>
    </div>
  );
}
