import React from 'react'

class Result extends React.Component {
  constructor(props) {
    super(props)

    this.audioSuccess = new Audio(`${process.env.PUBLIC_URL}/touch_success.wav`)
    this.audioFail = new Audio(`${process.env.PUBLIC_URL}/touch_fail.wav`)

    this.keyHandler = this.keyHandler.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keyHandler, false)

    if (this.props.statement.defense === this.props.statement.target) {
      this.audioFail.play()
    } else {
      this.audioSuccess.play()
    }
  }

  componentWillUnmount() {
    this.audioSuccess.pause()
    this.audioFail.pause()
    document.removeEventListener('keypress', this.keyHandler)
  }

  keyHandler(e) {
    if (e.key === ' ') {
      this.props.onDismiss()
    }
  }

  calculateScore() {
    const { bonus, target, claim, defense } = this.props.statement
    const { attacker, defender } = this.props

    const baseValue = bonus ? 2 : 1

    return {
      player: target === defense ? defender : attacker,
      points: target === defense ? (
        target === claim ? 1 : 2
      ) : (
        target === claim ? baseValue : baseValue * 2
      )
    }
  }

  render() {
    const { bonus, target, claim, defense } = this.props.statement
    const { attacker, defender } = this.props

    const { player, points } = this.calculateScore()

    return (
      <div className="overlay result">
        <h1>{target === claim ?
          `${attacker.name} told the truth!` :
          `${attacker.name} bluffed!`
        }</h1>
        <h1>{defense === target ?
          (target === claim ?
            `${defender.name} belived!` :
            `${defender.name} saw right through it!`) :
          (target === claim ?
            `${defender.name} didn't believe!` :
            `${defender.name} fell for it!`)
        }</h1>
        <h1>{defense === target ?
          `${defender.name} defended!` :
          `${attacker.name} scored!`
        }</h1>
        {bonus && <h1>{defense === target ?
          'That double-up was wasted!' :
          'Sweet, bonus points!'
        }</h1>}
        <h1>{player.name} gets {points} points!</h1>
        <div className="button"
             onClick={this.props.onDismiss}>
            Continue (Space)
        </div>
      </div>
    )
  }
}

export default Result
