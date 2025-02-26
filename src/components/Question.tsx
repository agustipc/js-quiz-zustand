import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { type Question as QuestionType } from '../types.d'
import Syntaxhighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestions } from '../store/questions'

const getBackgroundColor = (index: number, info: QuestionType) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer == null) return 'transparent'
  if (userSelectedAnswer === index) {
    return info.isCorrectUserAnswer ? '#05df72' : '#ff6467'
  }

  if (correctAnswer === index) {
    return '#05df72'
  }
}

export const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestions((state) => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card
      variant="outlined"
      sx={{ textAlign: 'left', bgcolor: '#242424', p: 2, marginTop: 12 }}
    >
      <Typography variant="h5" component="h2">
        {info.question}
      </Typography>

      <Syntaxhighlighter language="javascript" style={gradientDark}>
        {info.code}
      </Syntaxhighlighter>

      <List disablePadding sx={{ bgcolor: '#303030', marginTop: 6 }}>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              onClick={createHandleClick(index)}
              sx={{
                bgcolor: getBackgroundColor(index, info),
                pointerEvents: info.userSelectedAnswer == null ? 'auto' : 'none'
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
