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

export const Question = ({ info }: { info: QuestionType }) => {
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
            <ListItemButton>
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
