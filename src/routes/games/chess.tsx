import { ChessJoinSlides, Slide } from "@/components/chess-join-slides";
import { GameHistory, GameHistoryEntry } from "@/components/game-history";
import { LeaderBoard } from "@/components/leaderboard";
import { createFileRoute } from "@tanstack/react-router";

import bgTier1 from "@/assets/webp/chess-bg-tier1.webp";
import bgTier2 from "@/assets/webp/chess-bg-tier2.webp";
import bgTier3 from "@/assets/webp/chess-bg-tier3.webp";
import iconTier1 from "@/assets/webp/chess-icon-tier1.webp";
import iconTier2 from "@/assets/webp/chess-icon-tier2.webp";
import iconTier3 from "@/assets/webp/chess-icon-tier3.webp";
import textTier1 from "@/assets/svg/tier1.svg";
import textTier2 from "@/assets/svg/tier2.svg";
import textTier3 from "@/assets/svg/tier3.svg";
import { useQuery } from "@tanstack/react-query";
import { LoginDialog } from "@/components/login-dialog";
import { client } from "@/api/client";
import { useAuthSession } from "@/hooks/useAuthSession";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Wrapper } from "@/components/wrapper";

export const Route = createFileRoute("/games/chess")({
  component: Chess,
});

const PAGE_NAME = "chess";
const URL_CHESS = "https://chess.legacyofgame.io/web/game/index.html?room=";
// const URL_POOL = "https://pool.legacyofgame.io/play.html?room=";
// var is_logged_in = false;
// //var fl_balance = 0
// var actualToken = "FL";
// var balance = {
//   freelog: 0,
//   log: 0,
//   selected: 0,
// };

// game related
const LEADERBOARD_URL = "/misc/leaderboard"; // GET
const USER_HISTORY_URL = `/misc/${PAGE_NAME}History`; // GET

type HistoryEntry = {
  outcome: string;
  opponent_name: string;
  currency: string;
  date: string;
  bet: number | string;
};

function Chess() {
  const [selectedToken, setSelectedToken] = useState<"L" | "FL">("FL");
  const session = useAuthSession();
  const leaderboard = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await client
        .get<(string | number)[]>(LEADERBOARD_URL, {
          withCredentials: true,
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
      return res
        ? res.data.map((e) =>
            typeof e === "string" ? { name: e } : { name: "You", position: e },
          )
        : [];
    },
    initialData: [],
  });

  const userHistory = useQuery({
    queryKey: ["userHistory"],
    queryFn: async () => {
      const res = await client
        .get<HistoryEntry[]>(USER_HISTORY_URL, {
          withCredentials: true,
        })
        .catch((err) => {
          console.error(err);
          return null;
        });

      if (!res?.data) return [];

      const parsed: GameHistoryEntry[] = res.data.map((e) => ({
        bet: e.bet.toString(),
        date: new Date(e.date),
        outcome: e.outcome,
        opponent: e.opponent_name,
      }));

      return parsed;
    },
    initialData: [],
  });

  async function handlePlayClick(slide: Slide): Promise<void> {
    window.location.href = URL_CHESS + selectedToken + slide.admissionFee;
  }

  console.log(leaderboard.data, userHistory.data);

  return (
    <Wrapper>
      <hr className="h-4 sm:h-20" />

      <div className="flex justify-between w-full items-center max-w-screen-2xl">
        <div className="flex-grow">
          {session.data && (
            <p className="text-xl bg-card px-14 py-3 rounded-xl border text-white font-orbitron font-black inline">
              {session.data.username}
            </p>
          )}
        </div>

        <div className="flex-grow">
          {session.data && (
            <div className="flex gap-16 items-center justify-center">
              <button
                className={cn(
                  "w-52 py-3 text-xl rounded-xl font-orbitron font-black text-white border-2 disabled:opacity-70 disabled:cursor-not-allowed",
                  selectedToken === "FL"
                    ? "bg-[#9000FF] border-transparent"
                    : "bg-[#251130]",
                )}
                onClick={() => setSelectedToken("FL")}
              >
                {session.data.freelog} FL
              </button>
              <button
                disabled
                className={cn(
                  "w-52 py-3 text-xl rounded-xl font-orbitron font-black text-white border-2 disabled:opacity-70 disabled:cursor-not-allowed",
                  selectedToken === "L"
                    ? "bg-[#9000FF] border-transparent"
                    : "bg-[#251130]",
                )}
                onClick={() => setSelectedToken("L")}
              >
                {session.data.log} L
              </button>
            </div>
          )}
        </div>

        <div className="flex-grow flex items-center justify-end">
          <LoginDialog />
        </div>
      </div>

      <hr className="h-4 sm:h-20" />

      <ChessJoinSlides
        slides={
          selectedToken === "FL" ? CHESS_JOIN_FL_SLIDES : CHESS_JOIN_L_SLIDES
        }
        balance={
          session.data
            ? selectedToken === "FL"
              ? session.data.freelog
              : session.data.log
            : undefined
        }
        onClick={handlePlayClick}
      />

      <hr className="h-32 sm:h-64" />

      {leaderboard.isSuccess ? (
        <LeaderBoard entries={leaderboard.data} />
      ) : (
        <></>
      )}

      <hr className="h-32" />

      {userHistory.isSuccess ? (
        <GameHistory
          entries={userHistory.data}
          loggedIn={session.data !== null}
        />
      ) : (
        <></>
      )}

      <hr className="h-32" />
    </Wrapper>
  );
}

const CHESS_JOIN_FL_SLIDES: Slide[] = [
  {
    token: "FL",
    prize: 20,
    admissionFee: 10,
    iconImg: iconTier1,
    bgImg: bgTier1,
    tierImg: textTier1,
  },
  {
    token: "FL",
    prize: 200,
    admissionFee: 100,
    iconImg: iconTier2,
    bgImg: bgTier2,
    tierImg: textTier2,
  },
  {
    token: "FL",
    prize: 2000,
    admissionFee: 1000,
    iconImg: iconTier3,
    bgImg: bgTier3,
    tierImg: textTier3,
  },
];

const CHESS_JOIN_L_SLIDES: Slide[] = [
  {
    token: "L",
    prize: 2,
    admissionFee: 1,
    iconImg: iconTier1,
    bgImg: bgTier1,
    tierImg: textTier1,
  },
  {
    token: "L",
    prize: 10,
    admissionFee: 5,
    iconImg: iconTier2,
    bgImg: bgTier2,
    tierImg: textTier2,
  },
  {
    token: "L",
    prize: 20,
    admissionFee: 10,
    iconImg: iconTier3,
    bgImg: bgTier3,
    tierImg: textTier3,
  },
];
