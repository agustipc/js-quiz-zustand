import { create } from 'zustand'
import { type Question } from '../types.d'
import { persist, devtools } from 'zustand/middleware'

interface QuestionsState {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  reset: () => void
}

export const useQuestions = create<QuestionsState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          loading: false,

          fetchQuestions: async (limit: number) => {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/data.json`
            )
            const data = await response.json()

            const questions = data
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)
            set({ questions }, false, 'FETCH_QUESTIONS')
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

            set({ questions: newQuestions }, false, 'SELECT_ANSWER')
          },

          goToNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
              set(
                { currentQuestion: nextQuestion },
                false,
                'GO_TO_NEXT_QUESTION'
              )
            }
          },

          goToPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if (previousQuestion >= 0) {
              set(
                { currentQuestion: previousQuestion },
                false,
                'GO_TO_PREVIOUS_QUESTION'
              )
            }
          },

          reset: () => {
            set({ questions: [], currentQuestion: 0 }, false, 'RESET')
          }
        }
      },
      {
        name: 'questions-storage'
      }
    )
  )
)
