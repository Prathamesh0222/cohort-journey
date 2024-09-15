import { useState } from "react";
import { quizData } from "../constants/QuizData";

const QuizApp = () => {
  const [currentQuestions, setCurrentQuestions] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === quizData[currentQuestions].correct) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestions + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestions(nextQuestion);
      setSelectedAnswer("");
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestions(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswer("");
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="p-12 border rounded-lg">
          <div className="mb-2 text-2xl font-bold text-center">Quiz App</div>
          {showScore ? (
            <div className="text-center">
              <h2 className="mb-4 text-xl font-semibold">Quiz Completed!</h2>
              <p className="text-lg">
                You scored {score} out of {quizData.length}
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-4 text-lg font-semibold">
                Question {currentQuestions + 1}/{quizData.length}
              </h2>
              <p className="mb-4">{quizData[currentQuestions].question}</p>
              <div>
                {["a", "b", "c", "d"].map((optionKey) => (
                  <div key={optionKey} className="mb-2">
                    <label>
                      <input
                        type="radio"
                        value={optionKey}
                        checked={selectedAnswer === optionKey}
                        onChange={() =>
                          handleAnswerChange(optionKey as "a" | "b" | "c" | "d")
                        }
                        className="mr-2"
                      />
                      {
                        quizData[currentQuestions][
                          optionKey as "a" | "b" | "c" | "d"
                        ]
                      }
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="flex justify-center mt-4">
            {showScore ? (
              <button
                className="p-2 text-white border rounded-lg bg-neutral-900"
                onClick={handleRestartQuiz}
              >
                Restart Quiz
              </button>
            ) : (
              <button
                className="p-2 text-white border rounded-lg bg-neutral-900"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
              >
                {currentQuestions === quizData.length - 1
                  ? "Submit Quiz"
                  : "Next Question"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
