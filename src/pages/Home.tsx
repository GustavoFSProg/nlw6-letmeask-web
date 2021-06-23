import Illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/global.scss'
import '../styles/auth.scss'
import { Button } from '../components/Button'

function Home() {
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
          <button className="create-room">
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
