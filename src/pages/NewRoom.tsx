import React, { useContext } from 'react'

import Illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/global.scss'
import '../styles/auth.scss'
import { Button } from '../components/Button'

import { AuthContext } from '../Contexts/AuthContext'

function NewRoom() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, signInWithGoogle } = useContext(AuthContext)

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
          {console.log(user)}

          <p>Criar uma nova Sala</p>
          <form>
            <input type="text" placeholder="Digite o Códio da Sala" />
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
