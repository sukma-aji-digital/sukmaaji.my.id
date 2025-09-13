"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import GameHeader from "@/components/GameHeader";
import GameWelcome from "./components/GameWelcome";
import GameStats from "./components/GameStats";
import GameArea from "./components/GameArea";
import GameOver from "./components/GameOver";
import LiveLeaderboard from "@/components/LiveLeaderboard";
import AuthButtons from "@/components/AuthButtons";

interface Question {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
}

const MathGame = () => {
  const { data: session, status } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"correct" | "wrong" | "levelup" | "">("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number>(0);

  // Generate random math question based on level
  const generateQuestion = (): Question => {
    let operators: string[];
    let num1: number, num2: number, answer: number, operator: string;

    // Level 1-10: Addition and Subtraction
    if (level <= 10) {
      operators = ["+", "-"];
      operator = operators[Math.floor(Math.random() * operators.length)];

      switch (operator) {
        case "+":
          num1 = Math.floor(Math.random() * (level * 15)) + 1;
          num2 = Math.floor(Math.random() * (level * 15)) + 1;
          answer = num1 + num2;
          break;
        case "-":
          num1 = Math.floor(Math.random() * (level * 20)) + level * 10;
          num2 = Math.floor(Math.random() * num1) + 1;
          answer = num1 - num2;
          break;
        default:
          operator = "+";
          num1 = 1;
          num2 = 1;
          answer = 2;
      }
    }
    // Level 11-30: Multiplication and Division
    else if (level <= 30) {
      operators = ["*", "/"];
      operator = operators[Math.floor(Math.random() * operators.length)];

      switch (operator) {
        case "*":
          num1 = Math.floor(Math.random() * (level - 5)) + 2;
          num2 = Math.floor(Math.random() * (level - 5)) + 2;
          answer = num1 * num2;
          break;
        case "/":
          // Generate division with exact results
          answer = Math.floor(Math.random() * (level * 2)) + 1;
          num2 = Math.floor(Math.random() * 12) + 2;
          num1 = answer * num2;
          break;
        default:
          operator = "*";
          num1 = 2;
          num2 = 2;
          answer = 4;
      }
    }
    // Level 31+: Complex combinations
    else {
      operators = ["+", "-", "*", "/"];
      operator = operators[Math.floor(Math.random() * operators.length)];

      switch (operator) {
        case "+":
          num1 = Math.floor(Math.random() * (level * 25)) + level;
          num2 = Math.floor(Math.random() * (level * 25)) + level;
          answer = num1 + num2;
          break;
        case "-":
          num1 = Math.floor(Math.random() * (level * 30)) + level * 15;
          num2 = Math.floor(Math.random() * (num1 * 0.8)) + 1;
          answer = num1 - num2;
          break;
        case "*":
          num1 = Math.floor(Math.random() * level) + 3;
          num2 = Math.floor(Math.random() * level) + 3;
          answer = num1 * num2;
          break;
        case "/":
          answer = Math.floor(Math.random() * (level * 3)) + 2;
          num2 = Math.floor(Math.random() * 15) + 2;
          num1 = answer * num2;
          break;
        default:
          operator = "+";
          num1 = 1;
          num2 = 1;
          answer = 2;
      }
    }

    return { num1, num2, operator, answer };
  };

  // Start new game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setLevel(1);
    setTimeLeft(60);
    setGameStartTime(Date.now());
    setCurrentQuestion(generateQuestion());
    setUserAnswer("");
    setFeedback("");
    setFeedbackType("");
  };

  // Submit answer
  const submitAnswer = () => {
    if (!currentQuestion || userAnswer === "") return;

    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    const newTotalQuestions = totalQuestions + 1;

    setTotalQuestions(newTotalQuestions);

    if (isCorrect) {
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      const newScore = score + level * 10;
      setScore(newScore);

      // Add 10 seconds for correct answer
      setTimeLeft((prevTime) => prevTime + 10);
      setFeedback("🎉 Benar! +10 detik");
      setFeedbackType("correct");

      // Level up every 10 correct answers
      if (newCorrectAnswers % 10 === 0) {
        const newLevel = level + 1;
        setLevel(newLevel);
        setFeedback(`🚀 Level Up! Level ${newLevel}!`);
        setFeedbackType("levelup");
      }
    } else {
      // Subtract 4 seconds for wrong answer
      setTimeLeft((prevTime) => Math.max(0, prevTime - 4));
      setFeedback(`❌ Salah! Jawaban: ${currentQuestion.answer} (-4 detik)`);
      setFeedbackType("wrong");
    }

    // Immediately generate new question and clear input
    setCurrentQuestion(generateQuestion());
    setUserAnswer("");

    // Clear feedback after short display
    setTimeout(() => {
      setFeedback("");
      setFeedbackType("");
    }, 1500);
  };

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setGameStarted(false);
    }

    return () => clearTimeout(timer);
  }, [gameStarted, gameOver, timeLeft]);

  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Function to end game manually
  const endGameManually = () => {
    setShowEndGameConfirm(false);
    setGameOver(true);
    setGameStarted(false);
  };

  // Function to show end game confirmation
  const handleEndGame = () => {
    setShowEndGameConfirm(true);
  };

  // Render different screens based on game state
  if (!gameStarted && !gameOver) {
    return <GameWelcome onStartGame={startGame} />;
  }

  if (gameOver) {
    const gameEndTime = Date.now();
    const gameDuration = Math.round((gameEndTime - gameStartTime) / 1000);

    return (
      <GameOver
        score={score}
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
        level={level}
        accuracy={accuracy}
        onRestartGame={startGame}
        timeTaken={gameDuration}
      />
    );
  }

  // Main game screen with full screen layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Game Header */}
      <GameHeader
        title="🧮 Math Challenge"
        showEndGameButton={true}
        onEndGame={handleEndGame}
        extraInfo={
          session?.user ? (
            <div className="text-xs text-gray-600">
              Playing as: <span className="font-medium">{session.user.name}</span>
            </div>
          ) : null
        }
      />

      {/* Game Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Left sidebar with stats */}
        <div className="hidden lg:block lg:w-80 p-6 space-y-6">
          <GameStats
            score={score}
            level={level}
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
            accuracy={accuracy}
            timeLeft={timeLeft}
          />
        </div>

        {/* Main game area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile stats header */}
          <div className="lg:hidden bg-white shadow-lg p-3 sm:p-4 border-b">
            <div className="flex justify-between items-center text-xs sm:text-sm mb-3">
              <div className="flex space-x-2 sm:space-x-4">
                <span className="font-semibold">Level {level}</span>
                <span className="text-blue-600">{score} pts</span>
                <span className="text-green-600">
                  {correctAnswers}/{totalQuestions}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`font-bold text-sm sm:text-base transition-colors duration-500 ${
                    timeLeft <= 10
                      ? "text-red-600 animate-pulse"
                      : timeLeft <= 30
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  ⏰ {timeLeft}s
                </div>
              </div>
            </div>

            {/* Quick leaderboard link for mobile */}
            <div className="xl:hidden">
              <Link
                href="/games/math/leaderboard"
                className="block w-full text-center py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
              >
                🏆 View Leaderboard
              </Link>
            </div>
          </div>

          {/* Game area */}
          {currentQuestion && (
            <GameArea
              currentQuestion={currentQuestion}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              onSubmitAnswer={submitAnswer}
              feedback={feedback}
              feedbackType={feedbackType}
              level={level}
            />
          )}
        </div>

        {/* Right sidebar with live leaderboard */}
        <div className="hidden xl:block xl:w-80 p-6">
          <LiveLeaderboard gameType="math" />

          {/* Additional Leaderboard Link */}
          <div className="mt-4">
            <Link
              href="/games/math/leaderboard"
              className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📊 Full Leaderboard
            </Link>
          </div>
        </div>
      </div>

      {/* End Game Confirmation Modal */}
      {showEndGameConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">End Game?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end the game? Your current score will be saved.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowEndGameConfirm(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={endGameManually}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                End Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathGame;
