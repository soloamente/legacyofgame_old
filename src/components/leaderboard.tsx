export type LeaderboardEntry = {
  name: string;
  position?: number;
};

type Props = {
  entries: LeaderboardEntry[];
};

export function LeaderBoard({ entries }: Props) {
  return (
    <div className="w-full bg-card max-w-5xl flex flex-col justify-center items-center gap-10 relative border p-16 rounded-3xl overflow-hidden">
      <h4 className="text-4xl sm:text-6xl text-white font-orbitron font-black">
        Leaderboard
      </h4>

      <hr className="h-5" />
      <div className="grid grid-cols-[auto_1fr] w-full text-xl text-white font-medium text-start gap-y-10 gap-x-3">
        {entries.map((e, i) => (
          <>
            <p className="col-start-1 col-end-2">{e.position ?? i + 1}.</p>
            <p className="col-start-2 col-end-3">{e.name}</p>
          </>
        ))}
      </div>
    </div>
  );
}
