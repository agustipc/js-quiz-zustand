import { Button } from '@mui/material'
import { useQuestions } from './store/questions'

const LIMIT_QUESTIONS = 5

export const Start = () => {
  const fetchQuestions = useQuestions((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button onClick={handleClick} variant="contained" sx={{ marginTop: 12 }}>
      Start
    </Button>
  )
}
