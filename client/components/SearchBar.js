import React, {Component} from 'react'
import {connect} from 'react-redux'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onSubmit(ev) {
    ev.preventDefault()
    console.log(this.state.text)
  }
  onChange(ev) {
    this.setState({text: ev.target.value})
  }
  render() {
    const {text} = this.state
    const {onSubmit, onChange} = this
    return (
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(null, mapDispatchToProps)(SearchBar)
