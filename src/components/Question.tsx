import React, { ReactNode } from 'react'
import '../styles/question.scss'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  isHeighligted: boolean
  isAnswered: boolean
}

function Question({
  content,
  children,
  isHeighligted = false,
  isAnswered = false,
  author,
}: QuestionProps) {
  return (
    <div
      className={`question ${isAnswered ? 'answered' : ''} ${isHeighligted ? 'highlighted' : ''}`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}

export default Question
