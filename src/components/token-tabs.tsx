import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { XCircle } from "lucide-react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type Token = {
  id: string;
  name: string;
  subtitle?: string;
  desc?: string;
  longDesc?: string;
  price?: number;
  totEmission?: number;
  circSupply?: number;
  img?: string;
  link?: {
    label: string;
    to: string;
  };
};

type Props = {
  tokens: Token[];
  defaultId?: string;
};

export function TokenTabs({ tokens, defaultId }: Props) {
  return (
    tokens.length > 0 && (
      <Tabs
        defaultValue={defaultId ?? tokens[0].id}
        className="w-full max-w-screen-2xl justify-center items-center flex flex-col gap-4 py-6"
      >
        <TabsList>
          {tokens.map((t) => (
            <TabsTrigger value={t.id}>{t.name}</TabsTrigger>
          ))}
        </TabsList>
        {tokens.map((t) => (
          <TabsContent
            value={t.id}
            className="w-full flex justify-center items-center"
          >
            <TokenCard token={t} />
          </TabsContent>
        ))}
      </Tabs>
    )
  );
}

function TokenCard({ token: t }: { token: Token }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div
      className={cn(
        "w-full max-lg:mt-12 lg:w-[55rem] h-auto lg:h-[25rem] bg-card rounded-2xl grid grid-cols-3 max-lg:grid-cols-1 relative p-4 border-2 animate-fadeInUp",
        isInfoOpen
          ? "sm:grid-rows-[2fr_1fr] sm:grid flex flex-col justify-center items-center gap-4"
          : "grid-rows-[220px_1fr] sm:grid-rows-[240px_1fr] lg:grid-rows-[2fr_1fr]",
      )}
    >
      <button
        className="absolute right-5 top-5 z-10"
        onClick={() => setIsInfoOpen((v) => !v)}
      >
        {isInfoOpen ? (
          <XCircle className="h-7 w-7 text-border" />
        ) : (
          <InfoCircledIcon className="h-7 w-7 text-border" />
        )}
      </button>
      {isInfoOpen ? (
        <>
          <p className="col-start-1 col-end-4 row-start-1 row-end-2 text-lg mt-12 px-8 text-justify">
            {t.longDesc}
          </p>

          <div className="row-start-2 row-end-3 col-start-1 col-end-2 flex flex-col justify-end items-center sm:items-start px-8 py-4">
            <p className="text-4xl font-orbitron font-black text-white">
              ${t.price}
            </p>
            <p>Price</p>
          </div>
          <div className="row-start-2 row-end-3 col-start-2 col-end-3 flex flex-col justify-end items-center sm:items-start px-8 py-4">
            <p className="text-4xl font-orbitron font-black text-white">
              {t.totEmission}
            </p>
            <p>Total Emission</p>
          </div>
          <div className="row-start-2 row-end-3 col-start-3 col-end-4 flex flex-col justify-end items-center sm:items-start px-8 py-4">
            <p className="text-4xl font-orbitron font-black text-white">
              {t.circSupply}
            </p>
            <p>Circulating Supply</p>
          </div>
        </>
      ) : (
        <>
          <div className="col-start-1 col-end-2 lg:col-start-2 lg:col-end-4 flex flex-col justify-center items-center max-lg:text-center lg:items-start gap-6 relative lg:left-1/3 lg:-translate-x-1/4 lg:row-start-1 row-start-2 row-end-3 max-lg:pb-8">
            <div>
              <h4 className="text-4xl sm:text-6xl text-white font-orbitron font-black">
                {t.name.toUpperCase()}
              </h4>
              {t.subtitle && (
                <h5 className="text-xl sm:text-2xl font-orbitron text-white font-black">
                  {t.subtitle}
                </h5>
              )}
            </div>
            {t.desc && <p className="text-lg max-w-96">{t.desc}</p>}
            {t.link && (
              <Link to={t.link.to}>
                <Button>{t.link.label}</Button>
              </Link>
            )}
          </div>

          {t.img && (
            <img
              src={t.img}
              className={cn(
                "w-72 sm:w-80 justify-self-center h-auto lg:h-[110%] lg:w-auto object-cover max-lg:col-start-1 max-lg:col-end-2 max-lg:row-start-1 max-lg:row-end-2 lg:absolute relative -top-1/3 lg:top-1/2 lg:-translate-y-1/2 lg:-left-1/3 lg:translate-x-1/3",
              )}
            />
          )}
        </>
      )}
    </div>
  );
}
