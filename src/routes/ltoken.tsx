import { Hero } from "@/components/hero";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import ltoken1 from "@/assets/webp/ltoken-1.webp";
import ltoken2 from "@/assets/webp/ltoken-2.webp";
import ltoken3 from "@/assets/webp/ltoken-3.webp";
// import ltoken4 from "@/assets/png/ltoken-4.png";
// import ltoken5 from "@/assets/png/ltoken-5.png";
// import ltoken6 from "@/assets/png/ltoken-6.png";
import { LTokenCard, LTokenInfo } from "@/components/ltoken-card";
import { Wrapper } from "@/components/wrapper";
import { Ellipse } from "@/components/ellipse";

export const Route = createFileRoute("/ltoken")({
  component: LTokenPage,
});

function LTokenPage() {
  // hide this page until released 
  const router = useRouter();
  router.navigate({ to: "/", replace: true })  

  // component start

  return (
    <Wrapper>
      <Hero
        title="Buy L Token Testo di Prova"
        subtitle="Discover a world of exclusive games and rise to the top."
      />

      <hr className="h-10" />
      <div className="w-full flex flex-col items-center relative pt-20">
        <Ellipse />

        <hr className="h-10 lg:h-20" />

        <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-y-32 gap-x-20">
          {LTOKENS.map((t, i) => (
            <LTokenCard disabled={true} key={i} token={t} />
          ))}
        </div>

        <hr className="h-32" />
      </div>
    </Wrapper>
  );
}

const LTOKENS: LTokenInfo[] = [
  {
    img: ltoken1,
    count: 1,
    usdt: 1,
  },
  {
    img: ltoken2,
    count: 10,
    usdt: 1,
  },
  {
    img: ltoken3,
    count: 100,
    usdt: 1,
  },
  // {
  //   img: ltoken4,
  //   count: 500,
  //   usdt: 1,
  // },
  // {
  //   img: ltoken5,
  //   count: 1000,
  //   usdt: 1,
  // },
  // {
  //   img: ltoken6,
  //   count: 2000,
  //   usdt: 1,
  // },
];
