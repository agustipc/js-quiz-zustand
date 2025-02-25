import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavascriptLogo } from './components/JavascriptLogo'
import { Start } from './Start'
import { useQuestions } from './store/questions'
import { Game } from './components/Game'

function App() {
  const questions = useQuestions((state) => state.questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <JavascriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
