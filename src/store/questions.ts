import { create } from 'zustand'
import { type Question } from '../types.d'

interface QuestionsState {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
}

export const useQuestions = create<QuestionsState>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    loading: false,

    fetchQuestions: async (limit: number) => {
      const response = await fetch('http://localhost:5173/data.json')
      const data = await response.json()

      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)

      const questionIndex = newQuestions.findIndex(
        (question) => question.id === questionId
      )
      const questionInfo = newQuestions[questionIndex]
      const isCorrectAnswer = questionInfo.correctAnswer === answerIndex

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer: isCorrectAnswer,
        userSelectedAnswer: answerIndex
      }

      set({ questions: newQuestions })
    },

    goToNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },

    goToPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    }
  }
})
