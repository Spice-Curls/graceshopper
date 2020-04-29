import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Categories extends Component {
  constructor() {
    super()
    this.state = {
      categories: ['food', 'cats', 'dragons', 'castles', 'planets', 'universes']
    }
  }
  render() {
    const {categories} = this.state
    return (
      <div className="categories-list">
        {categories.map((category, idx) => (
          <Link to={`/${category}`} key={idx}>
            {category}
          </Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps)(Categories)
