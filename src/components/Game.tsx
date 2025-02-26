import { Stack } from '@mui/material'
import { useQuestions } from '../store/questions'
import { Question } from './Question'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export const Game = () => {
  const questions = useQuestions((state) => state.questions)
  const currentQuestion = useQuestions((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <Stack direction="column" gap={4}>
      <Question info={questionInfo} />
      <Navigation />
      <Footer />
    </Stack>
  )
}
