import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Categories = props => {
  const {categories} = props
  return (
    <div className="categories-list">
      {categories.map((category, idx) => (
        <Link to={`/category/${category.name.toLowerCase()}`} key={idx}>
          {category.name}
        </Link>
      ))}
    </div>
  )
}

const mapStateToProps = ({categories}) => {
  return {
    categories
  }
}

export default connect(mapStateToProps)(Categories)
