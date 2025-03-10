export type GameHistoryEntry = {
  opponent: string;
  outcome: string;
  bet: string;
  date?: Date;
};

type Props = {
  entries: GameHistoryEntry[];
  loggedIn: boolean;
};

export function GameHistory({ entries, loggedIn }: Props) {
  return (
    <div className="w-full bg-card max-w-5xl flex flex-col justify-center items-center gap-10 relative border p-16 rounded-3xl overflow-hidden">
      <h4 className="text-4xl sm:text-6xl text-white font-orbitron font-black">History</h4>

      <hr className="h-5" />
      {entries.length ? (
        <table className="w-full">
          <thead>
            <tr className="text-xl text-white font-medium text-center w-full">
              <th className="py-3">#.</th>
              <th>Opponent</th>
              <th>Bet</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr className="text-xl text-white font-medium text-center w-full" key={i}>
                <td className="py-3">{i + 1}</td>
                <td>{e.opponent}</td>
                <td>{e.bet}</td>
                <td>{e.date ? e.date.toLocaleDateString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{loggedIn ? "You have not played any match yet." : "You must login to see your game history."}</p>
      )}
    </div>
  );
}
