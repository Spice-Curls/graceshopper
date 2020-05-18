import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//components
import Categories from './Categories'

//fontawesome
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

/**
 * COMPONENT
 */
export const NotUserHome = props => {
  const {moststock, expensivo} = props
  return (
    <div>
      <div className="categoriesandproducts">
        <Categories {...props} closed={props.closed} />
      </div>
      <h1
        className={
          props.closed
            ? 'shopbycategory shake-horizontal closed'
            : 'shopbycategory shake-horizontal'
        }
      >
        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" /> Shop by category
      </h1>
      <main className="homepage">
        <div className="homepageitems">
          <h2>Our highest stocked products</h2>
          <div className="moststock">
            {moststock.map(product => (
              <Link
                to={`/search/product/${product.name}`}
                className="productcard"
                key={product.id}
              >
                <h1>{product.name}</h1>
                <img src={product.imageURL} />
                <h3>Stock: {product.stock}</h3>
              </Link>
            ))}
          </div>
          <h2>Our most expensive products</h2>
          <div className="moststock">
            {expensivo.map(product => (
              <Link
                to={`/search/product/${product.name}`}
                className="productcard"
                key={product.id}
              >
                <h1>{product.name}</h1>
                <img src={product.imageURL} />
                <h3>Price: ${product.price}</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  const moststock = [...state.products.sort((a, b) => b.stock - a.stock)].slice(
    0,
    6
  )
  const expensivo = [...state.products.sort((a, b) => b.price - a.price)].slice(
    0,
    6
  )
  return {
    moststock,
    expensivo
  }
}

export default connect(mapState)(NotUserHome)

/**
 * PROP TYPES
 */
NotUserHome.propTypes = {
  email: PropTypes.string
}
