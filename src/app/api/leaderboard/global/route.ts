import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const gameType = searchParams.get("gameType");

    let query = supabaseAdmin
      .from("game_sessions")
      .select(
        `
        id,
        score,
        level_reached,
        game_type,
        accuracy_percentage,
        created_at,
        users (
          id,
          name,
          avatar_url
        )
      `
      )
      .order("score", { ascending: false })
      .limit(Math.min(limit, 100));

    // Filter by game type if specified
    if (gameType && gameType !== "all") {
      query = query.eq("game_type", gameType);
    }

    const { data: leaderboard, error } = await query;

    if (error) {
      console.error("Global leaderboard error:", error);
      return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
    }

    // Get game statistics
    const { data: gameStats, error: statsError } = await supabaseAdmin
      .from("game_sessions")
      .select("game_type")
      .then(({ data, error }) => {
        if (error) return { data: null, error };

        const stats = data?.reduce((acc: Record<string, number>, session: any) => {
          acc[session.game_type] = (acc[session.game_type] || 0) + 1;
          return acc;
        }, {});

        return { data: stats, error: null };
      });

    return NextResponse.json({
      leaderboard: leaderboard || [],
      gameStats: gameStats || {},
      total: leaderboard?.length || 0,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
