import React, {Component} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import axios from 'axios'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      items: []
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  async componentDidMount() {
    const items = (await axios.get('/api/products')).data.map(item => {
      return {
        value: item.name,
        label: item.name
      }
    })
    this.setState({items: items})
  }

  onSubmit(ev) {
    ev.preventDefault()
    console.log(this.state.text)
  }

  onChange(ev) {
    this.setState({text: ev.target.value})
  }

  render() {
    const {items} = this.state
    const {onSubmit} = this

    return (
      <form onSubmit={onSubmit}>
        <Select options={items} />
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(null, mapDispatchToProps)(SearchBar)
