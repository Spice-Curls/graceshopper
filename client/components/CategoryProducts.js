import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const CategoryProducts = ({category}) => {
  return (
    <div>
      {category.products.map(product => {
        return (
          <div>
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

export default connect(null)(CategoryProducts)
