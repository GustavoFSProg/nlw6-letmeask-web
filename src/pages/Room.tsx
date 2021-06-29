/* eslint-disable no-unreachable */
import React from 'react'
import { useParams } from 'react-router-dom'
import LogoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import RoomCode from '../components/RoomCode'

type RoomParams = {
  id: string
}

function Room() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams<RoomParams>()
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="logo-img" />
          <RoomCode code={params.id} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que voce quer perguntar ?" />

          <div className="form-footer">
            <span>
              Para enviar uma pergunta,<button>faça seu login.!</button>
            </span>
            <Button style={{ width: '25%' }} type="submit">
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Room
