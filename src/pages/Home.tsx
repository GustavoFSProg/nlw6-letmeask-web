/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FormEvent, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/global.scss'
import '../styles/auth.scss'
import { Button } from '../components/Button'

import { AuthContext } from '../Contexts/AuthContext'
import { database } from '../services/firebase'

function Home() {
  const { user, signInWithGoogle } = useContext(AuthContext)
  const history = useHistory()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    handleClick()
  }

  function handleClick() {
    history.push('/new-room')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      return alert('Room not exists.')
    }

    if (roomRef.val().endedAt) {
      alert('Room alredy Closed!')

      return
    }

    history.push(`rooms/${roomCode}`)
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="google-icon" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o Códio da Sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na Sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
