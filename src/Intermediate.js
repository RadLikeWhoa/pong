import React from 'react'
import './Intermediate.css'

class Intermediate extends React.Component {
  constructor(props) {
    super(props)
    
    this.keyHandler = this.keyHandler.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  componentDidMount() {
    this.dismissTimeout = setTimeout(this.dismiss, 4500)

    document.preventKeyPresses = true
    document.addEventListener('keypress', this.keyHandler, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyHandler)
  }

  keyHandler(e) {
    if (e.key === ' ') {
      clearTimeout(this.dismissTimeout)
      this.dismiss()
    }
  }

  dismiss() {
    document.preventKeyPresses = false
    this.props.onDismiss()
  }

  render() {
    return (
      <div className="inter">
        <h1>{this.props.text}<span className="ellipsis-wrapper"><span className="ellipsis">...</span></span></h1>
      </div>
    )
  }
}

export default Intermediate
