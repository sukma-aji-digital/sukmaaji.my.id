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
    <div className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-xs sm:max-w-lg lg:max-w-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="text-center">
          {/* Level Badge */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-bold shadow-lg">
              Level {level} {level <= 10 ? "➕➖" : level <= 30 ? "✖️➗" : "🔥"}
            </span>
          </div>

          {/* Question Display */}
          <div className="mb-6 sm:mb-8">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-4 sm:mb-6 font-mono tracking-wider leading-tight break-all">
              <span className="text-blue-600">{currentQuestion.num1}</span>
              <span className="text-purple-600 mx-2 sm:mx-3 lg:mx-4">
                {currentQuestion.operator}
              </span>
              <span className="text-green-600">{currentQuestion.num2}</span>
              <span className="text-gray-800 mx-2 sm:mx-3 lg:mx-4">=</span>
              <span className="text-orange-600">?</span>
            </div>
          </div>

          {/* Feedback Display */}
          {feedback && (
            <div className="mb-4 sm:mb-6 animate-bounce">
              <div
                className={`inline-block px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-sm sm:text-lg lg:text-xl font-bold shadow-lg ${
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
          <div className="mb-6 sm:mb-8">
            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik jawaban..."
              className="w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center border-3 sm:border-4 border-green-500 rounded-xl sm:rounded-2xl py-3 sm:py-4 lg:py-6 px-4 sm:px-6 lg:px-8 focus:border-green-700 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-green-200 transition-all duration-200 shadow-inner bg-green-50 font-bold placeholder-green-700"
              autoComplete="off"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={onSubmitAnswer}
            disabled={userAnswer === ""}
            className={`px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-200 shadow-lg ${
              userAnswer === ""
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform hover:scale-105 hover:shadow-xl"
            }`}
          >
            ✓ Submit Jawaban
          </button>

          {/* Keyboard Hint */}
          <div className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-500 flex items-center justify-center">
            <span className="bg-gray-200 px-2 sm:px-3 py-1 rounded-lg mr-2 font-mono text-xs sm:text-sm">
              Enter
            </span>
            untuk submit cepat ⚡
          </div>

          {/* Visual Elements */}
          <div className="mt-4 sm:mt-6 lg:mt-8 flex justify-center space-x-3 sm:space-x-4 opacity-30">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameArea;
