import React, { useRef, useEffect } from "react";

interface Question {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
}

interface GameAreaProps {
  currentQuestion: Question;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  onSubmitAnswer: () => void;
  feedback: string;
  feedbackType: "correct" | "wrong" | "levelup" | "";
  level: number;
}

const GameArea: React.FC<GameAreaProps> = ({
  currentQuestion,
  userAnswer,
  setUserAnswer,
  onSubmitAnswer,
  feedback,
  feedbackType,
  level,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmitAnswer();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="text-center">
          {/* Level Badge */}
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
              Level {level} {level <= 10 ? "➕➖" : level <= 30 ? "✖️➗" : "🔥"}
            </span>
          </div>

          {/* Question Display */}
          <div className="mb-8">
            <div className="text-7xl lg:text-8xl font-bold text-gray-800 mb-6 font-mono tracking-wider leading-tight">
              <span className="text-blue-600">{currentQuestion.num1}</span>
              <span className="text-purple-600 mx-4">{currentQuestion.operator}</span>
              <span className="text-green-600">{currentQuestion.num2}</span>
              <span className="text-gray-800 mx-4">=</span>
              <span className="text-orange-600">?</span>
            </div>
          </div>

          {/* Feedback Display */}
          {feedback && (
            <div className="mb-6 animate-bounce">
              <div
                className={`inline-block px-8 py-4 rounded-xl text-xl font-bold shadow-lg ${
                  feedbackType === "correct"
                    ? "bg-green-100 text-green-800 border-2 border-green-300"
                    : feedbackType === "levelup"
                    ? "bg-purple-100 text-purple-800 border-2 border-purple-300"
                    : "bg-red-100 text-red-800 border-2 border-red-300"
                }`}
              >
                {feedback}
              </div>
            </div>
          )}

          {/* Answer Input */}
          <div className="mb-8">
            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik jawaban..."
              className="w-full max-w-lg mx-auto text-5xl text-center border-4 border-gray-300 rounded-2xl py-6 px-8 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-inner bg-gray-50 font-bold"
              autoComplete="off"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={onSubmitAnswer}
            disabled={userAnswer === ""}
            className={`px-12 py-4 rounded-2xl text-2xl font-bold transition-all duration-200 shadow-lg ${
              userAnswer === ""
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform hover:scale-105 hover:shadow-xl"
            }`}
          >
            ✓ Submit Jawaban
          </button>

          {/* Keyboard Hint */}
          <div className="mt-6 text-lg text-gray-500 flex items-center justify-center">
            <span className="bg-gray-200 px-3 py-1 rounded-lg mr-2 font-mono text-sm">Enter</span>
            untuk submit cepat ⚡
          </div>

          {/* Visual Elements */}
          <div className="mt-8 flex justify-center space-x-4 opacity-30">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameArea;
