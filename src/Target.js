import React from 'react'
import './Target.css'

class Target extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 'target',
      target: null,
      upKey: 'W',
      downKey: 'S'
    }

    this.keyHandler = this.keyHandler.bind(this)
  }

  componentDidMount() {
    if (this.props.position === 'left') {
      this.setState({
        upKey: 'P',
        downKey: 'L'
      })
    }

    document.addEventListener('keypress', this.keyHandler, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyHandler)
  }

  keyHandler(e) {
    if (document.preventKeyPresses) {
      return
    }

    const { upKey, downKey } = this.state

    if (this.state.step === 'target') {
      if (e.key === upKey || e.key === upKey.toLowerCase()) {
        this.selectTarget('top')
      } else if (e.key === downKey || e.key === downKey.toLowerCase()) {
        this.selectTarget('bottom')
      }
    } else {
      if (e.key === upKey || e.key === upKey.toLowerCase()) {
        this.selectClaim('top')
      } else if (e.key === downKey || e.key === downKey.toLowerCase()) {
        this.selectClaim('bottom')
      }
    }
  }

  selectTarget(target) {
    if (this.state.step === 'claim') {
      return
    }

    this.setState({
      target,
      step: 'claim'
    })
  }

  selectClaim(claim) {
    this.props.onSelect(this.state.target, claim)
  }

  render() {
    return (
      <div className={`overlay target target-${this.props.position}`}>
        {this.state.step === 'target' ? (
          <div className="target-explanation">
            <h1>{this.props.player.name}, Select your target</h1>
            <p>This is where you'll actually shoot.</p>
          </div>
        ) : (
          <div className="target-explanation">
            <h1>{this.props.player.name}, State your claim</h1>
            <p>Wanna bluff?</p>
          </div>
        )}
        <div className="target-options">
          <div className={`target-top ${this.state.step === 'claim' && this.state.target === 'bottom' ? 'is-hidden' : ''}`}
               onClick={() => this.selectTarget('top')}>{this.state.step === 'target' && `(${this.state.upKey})`}</div>
          <div className={`target-bottom ${this.state.step === 'claim' && this.state.target === 'top' ? 'is-hidden' : ''}`}
               onClick={() => this.selectTarget('bottom')}>{this.state.step === 'target' && `(${this.state.downKey})`}</div>
        </div>
        {this.state.step === 'claim' && (
          <div className="claim-options">
            <div className="claim-top"
                 onClick={() => this.selectClaim('top')}>{`(${this.state.upKey})`}</div>
            <div className="claim-bottom"
                 onClick={() => this.selectClaim('bottom')}>{`(${this.state.downKey})`}</div>
          </div>
        )}
      </div>
    )
  }
}

export default Target
