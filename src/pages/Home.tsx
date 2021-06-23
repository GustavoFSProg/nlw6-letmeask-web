import Illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

function Home() {
  return (
    <div>
      <aside>
        <img src={Illustration} alt="ilustration" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div>
          <img src={logoImg} alt="letmeAsk" />
          <button>
            <img src={googleIcon} alt="google-icon" />
            Crie sua sala com o Google
          </button>
          <div>ou entre em uma sala</div>

          <form>
            <input type="text" placeholder="Digite o Códio da Sala" />
            <button type="submit">Entrar na Sala</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
