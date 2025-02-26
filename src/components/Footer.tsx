import { Button, Stack } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestions } from '../store/questions'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestions((state) => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <Stack spacing={6}>
        <strong>{`✅ ${correct} Correct - ❌ ${incorrect} Incorrect - ❓${unanswered} Unanswered`}</strong>
        <Button
          type="reset"
          variant="outlined"
          color="error"
          onClick={() => reset()}
        >
          Reset
        </Button>
      </Stack>
    </footer>
  )
}
