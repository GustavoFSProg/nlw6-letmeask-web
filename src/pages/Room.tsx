/* eslint-disable no-unreachable */
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LogoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import RoomCode from '../components/RoomCode'
import { AuthContext } from '../Contexts/AuthContext'
import { database } from '../services/firebase'
import Question from '../components/Question'

type RoomParams = {
  id: string
}

type FirebaseQuestion = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHeighligted: boolean
  }
>

type QuestionsType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHeighligted: boolean
}

function Room() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('')
  const { user } = useContext(AuthContext)
  const [questions, setQuestions] = useState<QuestionsType[]>([])
  const [title, setTitle] = useState('')

  const roomId = params.id

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }
    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`/rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', (room) => {
      const databaseRoom = room.val()
      const firebaseQuestion: FirebaseQuestion = databaseRoom.questions ?? {}

      const parseQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHeighligted: value.isHeighligted,
          isAnswered: value.isAnswered,
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parseQuestions)
    })
  }, [roomId])

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="logo-img" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
            placeholder="O que voce quer perguntar ?"
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,<button>faça seu login.!</button>
              </span>
            )}
            <Button disabled={!user} style={{ width: '25%' }} type="submit">
              Enviar pergunta
            </Button>
          </div>
        </form>
        <div className="question-list">
          {questions.map((item) => {
            return (
              <div key={item.id}>
                <Question content={item.content} author={item.author} />
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Room
