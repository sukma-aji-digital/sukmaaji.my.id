import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { score, level, correctAnswers, totalQuestions, timePlayed, gameDuration, gameMode } =
      body;

    // Validate required fields
    if (
      typeof score !== "number" ||
      typeof level !== "number" ||
      typeof correctAnswers !== "number" ||
      typeof totalQuestions !== "number" ||
      typeof timePlayed !== "number"
    ) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    // Get user from database
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", session.user.email)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate accuracy percentage
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    // Insert game session
    const { data: gameSession, error: insertError } = await supabaseAdmin
      .from("game_sessions")
      .insert({
        user_id: userData.id,
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
      return NextResponse.json({ error: "Failed to save game session" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      gameSession,
      message: "Game session saved successfully",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
        created_at,
        users (
          id,
          name,
          avatar_url
        )
      `
      )
      .order("score", { ascending: false })
      .limit(Math.min(limit, 100)); // Max 100 results

    // If userId is provided, get user's rank and stats
    if (userId) {
      const { data: userStats, error: userError } = await supabaseAdmin
        .from("game_sessions")
        .select("score, level_reached, accuracy_percentage")
        .eq("user_id", userId)
        .order("score", { ascending: false });

      if (!userError && userStats) {
        // Get user's best score
        const bestScore = userStats[0]?.score || 0;

        // Get user's rank
        const { data: betterScores, error: rankError } = await supabaseAdmin
          .from("game_sessions")
          .select("score")
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
          return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
        }

        return NextResponse.json({
          leaderboard,
          userStats: {
            rank: userRank,
            bestScore,
            totalGames,
            avgAccuracy: Math.round(avgAccuracy * 100) / 100,
          },
        });
      }
    }

    const { data: leaderboard, error } = await query;

    if (error) {
      console.error("Leaderboard error:", error);
      return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
