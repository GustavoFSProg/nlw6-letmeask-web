/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/global.scss'
import '../styles/auth.scss'
import { Button } from '../components/Button'

import { AuthContext } from '../Contexts/AuthContext'

function Home() {
  const { user, signInWithGoogle } = useContext(AuthContext)
  const history = useHistory()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    handleClick()
  }

  function handleClick() {
    history.push('/new-room')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={Illustration} alt="ilustration" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <h1>{user?.name}</h1>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeAsk" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="google-icon" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>

          <form>
            <input type="text" placeholder="Digite o Códio da Sala" />
            <Button type="submit">Entrar na Sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
