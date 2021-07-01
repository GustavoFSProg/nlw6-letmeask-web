/* eslint-disable no-unreachable */
import { FormEvent, useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import LogoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import RoomCode from '../components/RoomCode'
import { AuthContext } from '../Contexts/AuthContext'
import { database } from '../services/firebase'
import Question from '../components/Question'
import useRoom from '../hooks/useRoom'
import deleteImage from '../assets/images/delete.svg'

type RoomParams = {
  id: string
}

function AdminRoom() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams<RoomParams>()
  const roomId = params.id
  const [newQuestion, setNewQuestion] = useState('')
  const { user } = useContext(AuthContext)
  const { title, questions } = useRoom(roomId)

  const hystory = useHistory()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    hystory.push('/')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="logo-img" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={() => handleEndRoom()} isOutlined style={{ width: '40%' }}>
              Encerrar a sala
            </Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <div className="question-list">
          {questions.map((item) => {
            return (
              <div key={item.id}>
                <Question content={item.content} author={item.author}>
                  <button type="button" onClick={() => handleDeleteQuestion(item.id)}>
                    <img src={deleteImage} alt="remover-pergunta" />
                  </button>
                </Question>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default AdminRoom
