import { useState } from "react";
import { WingComponent } from "./wing";

export function Welcome({ message }: { message: string }) {
  console.log("Welcome component rendered with message:", message);

  const [id, setId] = useState<string>("");
  const [stats, setStats] = useState<Map<string, number>>(new Map());

  const onClick = (v: string) => {
    setId(v);
    setStats((prevStats) => {
      const newStats = new Map(prevStats);
      newStats.set(v, (newStats.get(v) || 0) + 1);
      return newStats;
    });
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <WingComponent onClick={onClick} stats={stats}/>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Score</h2>
        <ul className="list-disc pl-5">
          {Array.from(stats.entries()).map(([key, value]) => (
            <li key={key} className="text-lg">
              {key}:
              {Array.from({ length: value }, (_, i) => (
                <span key={`${key}-${i}`} className="text-yellow-500">★</span>
              ))}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          setId("");
          setStats(new Map());
        }}
      >
        Reset
      </button>
    </main>
  );
}
