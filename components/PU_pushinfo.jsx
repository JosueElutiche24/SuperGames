import React from 'react'

export default function PushInfo({ranking, modeGame, }) {
  return (
    <div>
        <h4>{modeGame}</h4>
        <p>Ranking : {ranking}</p>
    </div>
  )
}
