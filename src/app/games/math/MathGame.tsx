"use client";

import { useState, useEffect, useRef } from "react";

interface Question {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
}

const MathGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"correct" | "wrong" | "levelup" | "">("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

      // Level up every 10 correct answers
      if (newCorrectAnswers % 10 === 0) {
        setLevel(level + 1);
        setFeedback(`🚀 Level Up! Level ${level + 1}`);
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

    // Focus back to input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitAnswer();
    }
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

  return (
    <div className="max-w-4xl mx-auto">
      {!gameStarted && !gameOver && (
        <div className="text-center bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🚀 Siap untuk Tantangan?</h2>
            <p className="text-gray-600 mb-6">
              Anda memiliki 60 detik untuk menjawab sebanyak mungkin soal matematika! Kecepatan dan
              akurasi adalah kunci!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-800 mb-1">📊 Level 1-10</div>
                <div className="text-blue-600">Penjumlahan & Pengurangan</div>
                <div className="text-xs text-blue-500 mt-1">Dasar matematis</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="font-semibold text-green-800 mb-1">⚡ Level 11-30</div>
                <div className="text-green-600">Perkalian & Pembagian</div>
                <div className="text-xs text-green-500 mt-1">Tingkat menengah</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="font-semibold text-purple-800 mb-1">🔥 Level 31+</div>
                <div className="text-purple-600">Kombinasi Kompleks</div>
                <div className="text-xs text-purple-500 mt-1">Mode expert</div>
              </div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-6">
              <div className="text-sm text-yellow-800">
                💡 <strong>Tips:</strong> Level naik setiap 10 jawaban benar! Fokus pada kecepatan
                dan akurasi.
              </div>
            </div>
          </div>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🚀 Mulai Game
          </button>
        </div>
      )}

      {gameOver && (
        <div className="text-center bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">⏰ Game Selesai!</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Total Skor</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Jawaban Benar</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">{totalQuestions}</div>
              <div className="text-sm text-gray-600">Total Soal</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{level}</div>
              <div className="text-sm text-gray-600">Level Tertinggi</div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
            <div className="text-lg font-semibold text-gray-800 mb-2">🎯 Akurasi: {accuracy}%</div>
            <div className="text-sm text-gray-600">
              {accuracy >= 90
                ? "🏆 Luar biasa!"
                : accuracy >= 75
                ? "🎉 Bagus sekali!"
                : accuracy >= 60
                ? "👍 Cukup baik!"
                : "💪 Terus berlatih!"}
            </div>
          </div>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🔄 Main Lagi
          </button>
        </div>
      )}

      {gameStarted && currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Statistik</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Skor:</span>
                  <span className="text-2xl font-bold text-blue-600">{score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Level:</span>
                  <span className="text-xl font-bold text-purple-600">{level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Benar:</span>
                  <span className="text-lg font-semibold text-green-600">{correctAnswers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-lg font-semibold text-orange-600">{totalQuestions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Akurasi:</span>
                  <span className="text-lg font-semibold text-indigo-600">{accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Waktu:</span>
                  <span
                    className={`text-2xl font-bold ${
                      timeLeft <= 10 ? "text-red-500" : "text-orange-500"
                    }`}
                  >
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Progress Level</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${((correctAnswers % 10) / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {10 - (correctAnswers % 10)} jawaban benar lagi untuk level berikutnya
              </p>
            </div>
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 relative">
              <div className="text-center">
                <div className="mb-6">
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-semibold mb-4">
                    Level {level} {level <= 10 ? "➕➖" : level <= 30 ? "✖️➗" : "🔥"}
                  </span>
                </div>

                {/* Question Display */}
                <div className="mb-8">
                  <div className="text-7xl font-bold text-gray-800 mb-4 font-mono tracking-wider">
                    {currentQuestion.num1} {currentQuestion.operator} {currentQuestion.num2} = ?
                  </div>
                </div>

                {/* Feedback Display */}
                {feedback && (
                  <div className="mb-6 animate-pulse">
                    <div
                      className={`inline-block px-6 py-3 rounded-lg text-lg font-semibold ${
                        feedbackType === "correct"
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : feedbackType === "levelup"
                          ? "bg-purple-100 text-purple-800 border border-purple-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {feedback}
                    </div>
                  </div>
                )}

                {/* Answer Input */}
                <div className="mb-6">
                  <input
                    ref={inputRef}
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik jawaban..."
                    className="w-full max-w-sm mx-auto text-4xl text-center border-3 border-gray-300 rounded-xl py-4 px-6 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-inner"
                    autoFocus
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={submitAnswer}
                  disabled={userAnswer === ""}
                  className={`px-10 py-4 rounded-xl text-xl font-semibold transition-all duration-200 ${
                    userAnswer === ""
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  }`}
                >
                  ✓ Submit
                </button>

                {/* Quick Tip */}
                <div className="mt-6 text-sm text-gray-500">💡 Tekan Enter untuk submit cepat</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathGame;
