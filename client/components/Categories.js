import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Categories = props => {
  const {categories, match, closed} = props
  const url = match && match.params.category
  return (
    <div
      className={
        closed
          ? 'slide-out-left categories-list'
          : 'slide-in-left categories-list'
      }
    >
      {categories.map((category, idx) => (
        <Link
          className={
            url === category.name.toLowerCase()
              ? 'selected categorylink'
              : 'categorylink'
          }
          to={`/category/${category.name.toLowerCase()}`}
          key={idx}
        >
          <span>{category.name}</span>
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
