"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
      setFeedback("🎉 Benar!");
      setFeedbackType("correct");

      // Level up every 10 correct answers with bonus time
      if (newCorrectAnswers % 10 === 0) {
        const newLevel = level + 1;
        setLevel(newLevel);
        // Add 100 seconds bonus time when leveling up
        setTimeLeft((prevTime) => prevTime + 100);
        setFeedback(`🚀 Level Up! Level ${newLevel} + 100s Bonus!`);
        setFeedbackType("levelup");
      }
    } else {
      setFeedback(`❌ Salah! Jawaban: ${currentQuestion.answer}`);
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
    return (
      <GameOver
        score={score}
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
        level={level}
        accuracy={accuracy}
        onRestartGame={startGame}
        timeTaken={60 - timeLeft} // Calculate actual time taken
      />
    );
  }

  // Main game screen with full screen layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/games" className="text-blue-500 hover:text-blue-600 transition-colors">
                ← Back to Games
              </Link>
              <div className="text-2xl font-bold text-gray-800">🧮 Math Challenge</div>
            </div>
            <div className="flex items-center gap-4">
              {session?.user && (
                <div className="text-sm text-gray-600">
                  Playing as: <span className="font-medium">{session.user.name}</span>
                </div>
              )}
              <button
                onClick={handleEndGame}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                End Game
              </button>
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex">
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
        <div className="flex-1 flex flex-col">
          {/* Mobile stats header */}
          <div className="lg:hidden bg-white shadow-lg p-4 border-b">
            <div className="flex justify-between items-center text-sm mb-3">
              <div className="flex space-x-4">
                <span className="font-semibold">Level {level}</span>
                <span className="text-blue-600">{score} pts</span>
                <span className="text-green-600">
                  {correctAnswers}/{totalQuestions}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`font-bold ${timeLeft <= 10 ? "text-red-600" : "text-orange-600"}`}>
                  {timeLeft}s
                </div>
                <button
                  onClick={handleEndGame}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                >
                  End
                </button>
              </div>
            </div>

            {/* Mobile leaderboard preview */}
            <div className="xl:hidden">
              <LiveLeaderboard gameType="math" />
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
