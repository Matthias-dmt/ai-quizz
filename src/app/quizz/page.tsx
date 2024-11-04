"use client";
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ChevronLeft, X } from 'lucide-react'

import ProgressBar from "@/components/progressBar"
import ResultCard from "./ResultCard";
import QuizzSubmission from "./QuizzSubmission";

const questions = [
  {
    id: 1,
    questionText: 'What is the capital of France?',
    answers: [
      { id: 1, answerText: 'New York', isCorrect: false },
      { id: 2, answerText: 'London', isCorrect: false },
      { id: 3, answerText: 'Paris', isCorrect: true },
      { id: 4, answerText: 'Dublin', isCorrect: false },
    ],
  },
  {
    id: 2,
    questionText: 'What is the capital of France? 2',
    answers: [
      { id: 1, answerText: 'New York', isCorrect: false },
      { id: 2, answerText: 'London', isCorrect: false },
      { id: 3, answerText: 'Paris', isCorrect: true },
      { id: 4, answerText: 'Dublin', isCorrect: false },
    ],
  }
]

export default function Home() { 
  const [started, setStarted] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleNext = () => {
    if (!started) {
      setStarted(true)
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setSubmitted(true)
      return;
    }

    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id)
    const isCurrentAnswerCorrect = answer.isCorrect
    if (isCurrentAnswerCorrect) {
      setScore(score + 1)
    }
    setIsCorrect(isCurrentAnswerCorrect)
  }

  if (submitted) {
    return (
      <QuizzSubmission
        score={score}
        totalQuestions={questions.length}
        scorePercentage={Math.round((score / questions.length) * 100)}
      />
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="position-sticky top-0 z-10 shadow-md py-4 w-full ">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2 ">
          <Button size='icon' variant='outline'>
            <ChevronLeft />
          </Button>
          <ProgressBar value={(currentQuestion / questions.length) * 100} />
          <Button size='icon' variant='outline'>
            <X />
          </Button>
        </header>
      </div>
      <main className="flex justify-center flex-1">
      {!started
        ? <h2 className="text-3xl font-bold">Welcome to the QuiQuiQuizzz 👋</h2>
        : <div>
            <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {questions[currentQuestion].answers.map(answer => {
                  const variant = selectedAnswer === answer.id ? (answer.isCorrect ? 'neoSuccess' : 'neoDanger') : 'neoOutline';

                  return (<Button key={answer.answerText} variant={variant} size={"xl"} onClick={() => handleAnswer(answer)}>
                    <p className="whitespace-normal">
                      {answer.answerText}
                    </p>
                  </Button>
                  )}
                )
              }
            </div>
          </div>
      }
      </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <ResultCard
          isCorrect={isCorrect}
          correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect)?.answerText || ''}
        />
        <Button variant='neo' size='lg' onClick={handleNext}>{!started ?  'Start the quizz' : (currentQuestion === questions.length - 1) ? 'Submit' : 'Next' }</Button>
      </footer> 
    </div>
  )
}
