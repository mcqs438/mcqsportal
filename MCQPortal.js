import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Galileo", "Tesla"],
    answer: "Einstein",
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
];

export default function MCQPortal() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [quizOver, setQuizOver] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setSubmitted(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizOver(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizOver(false);
    setSubmitted(false);
    setSelectedOption(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          {quizOver ? (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Quiz Over!</h2>
              <p className="mb-4">Your Score: {score}/{questions.length}</p>
              <Button onClick={restartQuiz} className="w-full">Restart Quiz</Button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-2 border rounded cursor-pointer ${
                      selectedOption === option ? "bg-blue-300" : "bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      className="hidden"
                      onChange={() => setSelectedOption(option)}
                      disabled={submitted}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {!submitted ? (
                <Button onClick={handleSubmit} className="mt-4 w-full">Submit</Button>
              ) : (
                <Button onClick={nextQuestion} className="mt-4 w-full">Next</Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}

