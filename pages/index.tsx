// Packages
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';

// Components
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';

// Constants
import { resMap } from '../src/constants'

// Styles
import styles from '../styles/Home.module.css'

// Types
import { PlayerStats, CardObject, Player } from '../src/types';

// Utilities
import { GameInstance } from '../src/utils';
import { OpponentAI } from '../src/opponent/opponent-ai';
import { Animator } from '../src/utils/animations'

const Home: NextPage = () => {
  const gameInstance = new GameInstance()
  const animator = new Animator()
  const opponentAI = new OpponentAI()
  const [gameState, updateGameState] = useState(gameInstance.initialInstance)
  const [activeCards, setActiveCards] = useState<number | null>(null)
  const [player1, updatePlayer1] = useState(gameInstance.newPlayer())
  const [player2, updatePlayer2] = useState(gameInstance.newPlayer())

  const winCondition = async (player: PlayerStats, opponent: PlayerStats) => {
    const resourceWin = (player.energy || player.ammunition || player.material || player.health) >= 50
    return opponent.health <= 0 || resourceWin
  }

  const checkWin = async () => {
    if (await winCondition(player1.stats, player2.stats)) {
      console.log('Player 1 wins!')
      gameState.started = false; gameState.win = true; gameState.winner = 'Player 1'
      updateGameState({ ...gameState })
    }
    if (await winCondition(player2.stats, player1.stats)) {
      console.log('Player 2 wins!')
      gameState.started = false; gameState.win = true; gameState.winner = 'Player 2'
      updateGameState({ ...gameState })
    }
  }

  useEffect(() => {
    checkWin().then(() => {
      if (gameState.turn === 2 && !gameState.win) {
        opponentRound()
      }
    })
  }, [gameState.turn])

  const player1Ref = useRef({hull: player1.stats.hull, health: player1.stats.health})
  const player2Ref = useRef({hull: player2.stats.hull, health: player2.stats.health})

  useEffect(() => {
    animator.animateEffect(player1, player1Ref)
    animator.animateEffect(player2, player2Ref)
    player1Ref.current = {hull: player1.stats.hull, health: player1.stats.health}
    player2Ref.current = {hull: player2.stats.hull, health: player2.stats.health}
  }, [player1.stats.hull, player2.stats.hull, player1.stats.health, player2.stats.health])

  const startGame = (): void => {
    updatePlayer1({...gameInstance.newPlayer(), name: 'player1'})
    updatePlayer2({...gameInstance.newPlayer(), name: 'player2'})
    updateGameState(gameInstance.newGame())
  }

  const playCard = async (c: CardObject, p: Player, o: Player, i: number) => {
    setActiveCards(i)
    await gameInstance.playCard(c, p, o, i)
    updateStats()
    await gameInstance.discardCard(p, i)
    updateStats()
    gameState.turn === 2 && setActiveCards(null)
    await animator.animateDraw(`card-${i}`)
    gameState.turn === 1 && setActiveCards(null)
    endRound(p)
  }

  const handleDiscard = async (p: Player, i: number, e?: any) => {
    e && e.preventDefault()
    setActiveCards(i)
    await gameInstance.discardCard(p, i)
    updateStats()
    await animator.animateDraw(`card-${i}`)
    setActiveCards(null)
    endRound(p)
  }

  const updateStats = () => {
    updatePlayer1({ ...player1 })
    updatePlayer2({ ...player2 })
  }

  const endRound = async (p: Player) => {
    gameInstance.statusHandler(p)
    gameInstance.updateResources(p.stats)
    updateGameState({ ...gameState, turn : gameState.turn === 1 ? 2: 1 })
  }

  const opponentRound = () => {
    const { action, index } = opponentAI.playTurn(player2)
    if (action === 'play') {
      playCard(player2.hand[index], player2, player1, index)
    } else {
      handleDiscard(player2, index)
    }
  }

  const cards = (p: Player, o: Player, t: number) => p.hand.map((c: CardObject, i: number) => {
    return (
      <div className='card-container' key={i} onClick={(e) => (c.cost <= p.stats[resMap[c.type]] && activeCards !== i) && playCard(c, p, o, i)} onContextMenu={(e) => activeCards !== i && handleDiscard(p, i, e)}>
        <Card card={c} stats={p.stats} turn={t} cardNum={i} active={activeCards}></Card>
      </div>
    )
  })

  return (
    <>
      <Head>
        <title>AstroMage</title>
      </Head>
      {!gameState.started && !gameState.win ?
        <div className={styles.startContainer}>
          <h1>AstroMage</h1>
          <button className={styles.button} onClick={() => startGame()}>Start Game</button>
        </div> :
        <main id='main' className={styles.gameContainer}>
          <div className={styles.playerOneDiv}>
            <ResourceUi playerStats={player1.stats}></ResourceUi>
          </div>
          <div className={styles.shipOneDiv}>
            <Ship player='player1' stats={player1.stats} statusEffects={player1.statusEffects} turn={gameState.turn}></Ship>
          </div>
          <div className={styles.playedCardsDiv}>
            <div id='card-deck' className={styles.cardDeck}>
              <div className={styles.cardDeck}><div className={styles.cardDeck}></div></div>
            </div>
          </div>
          <div className={styles.gamePlayDiv}></div>
          <div className={styles.playerTwoDiv}>
            <ResourceUi playerStats={player2.stats}></ResourceUi>
          </div>
          <div className={styles.shipTwoDiv}>
            <Ship player='player2' stats={player2.stats} statusEffects={player2.statusEffects} turn={gameState.turn}></Ship>
          </div>
          <div className={styles.playerHandDiv}>{gameState.turn === 1 ? cards(player1, player2, gameState.turn) : cards(player2, player1, gameState.turn)}</div>
        </main>
      }
      {gameState.win &&
        <div className={styles.winContainer}>
          <h1>{gameState.winner} WINS!</h1>
          <button className={styles.button} onClick={() => startGame()}>Start Game</button>
        </div>
      }
    </>
  )
}

export default Home
