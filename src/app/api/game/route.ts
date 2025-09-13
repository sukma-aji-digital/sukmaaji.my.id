import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      );
      return response;
    }

    // Parse request body
    const body = await req.json();
    const { score, level, correctAnswers, totalQuestions, timePlayed, gameDuration, gameType } =
      body;

    // Validate required fields
    if (
      typeof score !== "number" ||
      typeof level !== "number" ||
      typeof correctAnswers !== "number" ||
      typeof totalQuestions !== "number" ||
      typeof timePlayed !== "number"
    ) {
      const response = NextResponse.json({ error: "Invalid input data" }, { status: 400 });
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      );
      return response;
    }

    // Get user from database
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", session.user.email)
      .single();

    if (userError || !userData) {
      const response = NextResponse.json({ error: "User not found" }, { status: 404 });
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      );
      return response;
    }

    // Calculate accuracy percentage
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    // Insert game session
    const { data: gameSession, error: insertError } = await supabaseAdmin
      .from("game_sessions")
      .insert({
        user_id: userData.id,
        game_type: gameType || "math", // Default to math
        score,
        level_reached: level,
        correct_answers: correctAnswers,
        total_questions: totalQuestions,
        time_played: timePlayed,
        game_duration: gameDuration || timePlayed,
        accuracy_percentage: Math.round(accuracy * 100) / 100, // Round to 2 decimal places
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error saving game session:", insertError);
      const response = NextResponse.json({ error: "Failed to save game session" }, { status: 500 });
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      );
      return response;
    }

    const response = NextResponse.json({
      success: true,
      gameSession,
      message: "Game session saved successfully",
    });

    // Add comprehensive no-cache headers
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Last-Modified", new Date().toUTCString());

    return response;
  } catch (error) {
    console.error("API error:", error);
    const response = NextResponse.json({ error: "Internal server error" }, { status: 500 });
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    return response;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const userId = searchParams.get("userId");

    // Get global leaderboard
    let query = supabaseAdmin
      .from("game_sessions")
      .select(
        `
        id,
        score,
        level_reached,
        correct_answers,
        total_questions,
        time_played,
        accuracy_percentage,
        game_type,
        created_at,
        users (
          id,
          name,
          avatar_url
        )
      `
      )
      .eq("game_type", "math") // Only math games for this endpoint
      .order("score", { ascending: false })
      .limit(Math.min(limit, 100)); // Max 100 results

    // If userId is provided, get user's rank and stats
    if (userId) {
      const { data: userStats, error: userError } = await supabaseAdmin
        .from("game_sessions")
        .select("score, level_reached, accuracy_percentage")
        .eq("user_id", userId)
        .eq("game_type", "math") // Only math games
        .order("score", { ascending: false });

      if (!userError && userStats) {
        // Get user's best score
        const bestScore = userStats[0]?.score || 0;

        // Get user's rank
        const { data: betterScores, error: rankError } = await supabaseAdmin
          .from("game_sessions")
          .select("score")
          .eq("game_type", "math") // Only math games
          .gt("score", bestScore);

        const userRank = betterScores ? betterScores.length + 1 : 1;

        // Get user's total games and average accuracy
        const totalGames = userStats.length;
        const avgAccuracy =
          totalGames > 0
            ? userStats.reduce((sum, game) => sum + game.accuracy_percentage, 0) / totalGames
            : 0;

        const { data: leaderboard, error } = await query;

        if (error) {
          const response = NextResponse.json(
            { error: "Failed to fetch leaderboard" },
            { status: 500 }
          );
          response.headers.set(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
          );
          return response;
        }

        const response = NextResponse.json({
          leaderboard,
          userStats: {
            rank: userRank,
            bestScore,
            totalGames,
            avgAccuracy: Math.round(avgAccuracy * 100) / 100,
          },
        });

        // Add no-cache headers
        response.headers.set(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
        );
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Last-Modified", new Date().toUTCString());

        return response;
      }
    }

    const { data: leaderboard, error } = await query;

    if (error) {
      console.error("Leaderboard error:", error);
      const response = NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      );
      return response;
    }

    const response = NextResponse.json({ leaderboard });

    // Add no-cache headers
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Last-Modified", new Date().toUTCString());

    return response;
  } catch (error) {
    console.error("API error:", error);
    const response = NextResponse.json({ error: "Internal server error" }, { status: 500 });
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    return response;
  }
}
