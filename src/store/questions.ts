import { create } from 'zustand'
import { type Question } from '../types.d'

interface QuestionsState {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
}

export const useQuestions = create<QuestionsState>((set) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const response = await fetch('http://localhost:5173/data.json')
      const data = await response.json()

      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    }
  }
})
