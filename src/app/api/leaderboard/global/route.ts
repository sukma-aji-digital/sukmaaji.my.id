import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
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
      const response = NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
      // Add no-cache headers
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      );
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
      return response;
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

    const response = NextResponse.json({
      leaderboard: leaderboard || [],
      gameStats: gameStats || {},
      total: leaderboard?.length || 0,
    });

    // Add comprehensive no-cache headers
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Last-Modified", new Date().toUTCString());
    response.headers.set("ETag", '"' + Date.now() + '"');

    return response;
  } catch (error) {
    console.error("API error:", error);
    const response = NextResponse.json({ error: "Internal server error" }, { status: 500 });
    // Add no-cache headers for errors too
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  }
}
