import { useQuestions } from '../store/questions'

export const useQuestionsData = () => {
  const questions = useQuestions((state) => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((question) => {
    if (question.userSelectedAnswer == null) unanswered++
    else if (question.userSelectedAnswer === question.correctAnswer) correct++
    else incorrect++
  })

  return { correct, incorrect, unanswered }
}
