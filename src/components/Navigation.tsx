import { IconButton, Stack } from '@mui/material'
import { useQuestions } from '../store/questions'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export const Navigation = () => {
  const goToNextQuestion = useQuestions((state) => state.goToNextQuestion)
  const goToPreviousQuestion = useQuestions(
    (state) => state.goToPreviousQuestion
  )
  const currentQuestion = useQuestions((state) => state.currentQuestion)
  const questions = useQuestions((state) => state.questions)

  return (
    <Stack gap={2} direction="row" justifyContent="center" alignItems="center">
      <IconButton
        onClick={goToPreviousQuestion}
        disabled={currentQuestion === 0}
      >
        <ArrowBackIosIcon />
      </IconButton>
      {currentQuestion + 1} / {questions.length}
      <IconButton
        onClick={goToNextQuestion}
        disabled={currentQuestion >= questions.length - 1}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Stack>
  )
}
