import React, {Component} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import axios from 'axios'

// import styles from './navbar/navbar.css';

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      items: [],
      options: ['Product', 'Category', 'User'],
      type: 'product'
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.findItems = this.findItems.bind(this)
  }

  async componentDidMount() {
    this.findItems()
  }

  async findItems(filter = 'product') {
    let items
    switch (filter) {
      case 'product':
        items = (await axios.get('/api/products')).data.map(item => {
          return {
            value: item.name,
            label: item.name
          }
        })
        break
      case 'category':
        items = (await axios.get('/api/categories')).data.map(category => {
          return {
            value: category.id,
            label: category.name
          }
        })
        break
      case 'user':
        items = (await axios.get('/api/users')).data.map(user => {
          return {
            value: user.id,
            label: user.email
          }
        })
        break
    }
    this.setState({items: items})
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.props.history.push(`/search/${this.state.type}/${this.state.text}`)
  }

  render() {
    const {items, options} = this.state
    const {onSubmit, findItems} = this
    return (
      <div className="searchbar">
        <form onSubmit={onSubmit}>
          <select
            onChange={filter => {
              this.setState({type: filter.target.value.toLowerCase()})
              findItems(filter.target.value.toLowerCase())
            }}
          >
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
          <Select
            onChange={item => this.setState({text: item.value})}
            options={items}
            className="searchinput"
          />
          <button>Search</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(null, mapDispatchToProps)(SearchBar)
