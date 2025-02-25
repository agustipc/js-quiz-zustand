import { useQuestions } from '../store/questions'
import { Question } from './Question'

export const Game = () => {
  const questions = useQuestions((state) => state.questions)
  const currentQuestion = useQuestions((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return <Question info={questionInfo} />
}
