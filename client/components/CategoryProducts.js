import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const CategoryProducts = ({match, categories}) => {
  const category = categories.find(
    find => find.name.toLowerCase() === match.params.category
  )
  return (
    <div>
      {category &&
        category.products.map(product => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <img src={product.imageURL} />
              <div>{product.description}</div>
              <div>{product.condition}</div>
              <div>{product.price}</div>
            </div>
          )
        })}
    </div>
  )
}

const mapState = ({categories}) => {
  return {
    categories
  }
}

export default connect(mapState)(CategoryProducts)
