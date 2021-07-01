import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { database } from '../services/firebase'

type QuestionsType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHeighligted: boolean
  likesCount: number
  hasLikes: boolean
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
    likes: Record<
      string,
      {
        authorId: string
      }
    >
    hasLikes: boolean
    likesCount?: number
  }
>

function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionsType[]>([])
  const [title, setTitle] = useState('')
  const { user } = useContext(AuthContext)

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
          likesCount: Object.values(value.likes ?? {}).length,
          hasLikes: Object.values(value.likes ?? {}).some((like) => like.authorId === user?.id),
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parseQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])
  return { questions, title }
}

export default useRoom
