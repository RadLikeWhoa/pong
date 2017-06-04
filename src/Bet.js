import React from 'react'
import './Bet.css'

class Bet extends React.Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)
  }

  componentDidUpdate() {
    if (this.props.visible) {
      this.input.value = 1
      this.input.focus()
    }
  }

  confirm() {
    if (this.input.value <= this.props.total && this.input.value > 0) {
      this.props.onConfirm(this.input.value)
    }
  }

  render() {
    return (
      <div className={`bet ${this.props.visible ? 'is-visible' : ''}`}>
        <h1>Set your bet</h1>
        <p>You can bet up to {this.props.total || 0} points.</p>
        <input type="text"
               ref={n => this.input = n} />
        <button className="button"
                onClick={this.confirm}>
            Bet
        </button>
      </div>
    )
  }
}

export default Bet
