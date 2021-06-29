import { FormEvent, useContext, useState } from 'react'

import Illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/global.scss'
import '../styles/auth.scss'
import { Button } from '../components/Button'

import { AuthContext } from '../Contexts/AuthContext'
import { database } from '../services/firebase'
import { useHistory } from 'react-router'

function NewRoom() {
  const [newRoom, setNewRoom] = useState('')
  const history = useHistory()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useContext(AuthContext)

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={Illustration} alt="ilustration" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeAsk" />
          <h1>{user?.name}</h1>

          <p>Criar uma nova Sala</p>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              onChange={(event) => setNewRoom(event.target.value)}
              placeholder="Digite o Códio da Sala"
              value={newRoom}
            />
            <Button type="submit">Criar Sala</Button>
          </form>
          <p>
            Quer entrar numa sala existente? <a href="ser">clique aqui</a>
          </p>
        </div>
      </main>
    </div>
  )
}

export default NewRoom
