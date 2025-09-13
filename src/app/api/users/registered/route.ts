import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const limit = parseInt(searchParams.get("limit") || "50");

    // Get registered users with their game stats
    const { data: users, error } = await supabaseAdmin
      .from("users")
      .select(
        `
        id,
        name,
        avatar_url,
        created_at,
        game_sessions!inner(score, game_type)
      `
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching users:", error);
      const response = NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
      // Add no-cache headers
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      );
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
      return response;
    }

    // Process user data to include stats
    const processedUsers =
      users?.map((user) => {
        const gameSessions = user.game_sessions || [];
        const totalGames = gameSessions.length;
        const bestScore =
          gameSessions.length > 0 ? Math.max(...gameSessions.map((s) => s.score)) : 0;

        return {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url,
          created_at: user.created_at,
          stats: {
            totalGames,
            bestScore,
          },
        };
      }) || [];

    // Remove duplicates and sort by best score
    const uniqueUsers = processedUsers
      .filter((user, index, array) => array.findIndex((u) => u.id === user.id) === index)
      .sort((a, b) => b.stats.bestScore - a.stats.bestScore);

    const response = NextResponse.json({
      users: uniqueUsers,
      total: uniqueUsers.length,
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
