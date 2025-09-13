import Leaderboard from "@/components/Leaderboard";
import GameHeader from "@/components/GameHeader";

export default function MathLeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <GameHeader
        title="🏆 Math Leaderboard"
        backLink="/games/math"
        backLabel="Back to Math Game"
      />
      <Leaderboard />
    </div>
  );
}
