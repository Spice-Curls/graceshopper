import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart, addToWishlist} from '../store/index'
import axios from 'axios'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      found: []
    }
  }

  async componentDidMount() {
    const search = (await axios.get(
      `/api/search/${this.props.match.params.type}/${
        this.props.match.params.query
      }`
    )).data
    this.setState({found: search})
  }

  async componentDidUpdate(prev) {
    if (prev !== this.props) {
      const search = (await axios.get(
        `/api/search/${this.props.match.params.type}/${
          this.props.match.params.query
        }`
      )).data
      this.setState({found: search})
    }
  }

  render() {
    const {match, addCart, addWish, setCartNotif} = this.props
    const {found} = this.state
    return match.params.type === 'product' ? (
      <div className="notnav">
        {found.map(product => (
          <div key={product.id}>
            <div>{product.name}</div>
            <img src={product.imageURL} />
            <div>{product.description}</div>
            <div>{product.condition}</div>
            <div>${product.price}</div>
            <div>Stock:{product.stock}</div>
            <button type="submit" onClick={() => addWish(product)}>
              Add To Wishlist
            </button>
            <button
              type="submit"
              onClick={() => {
                addCart(product)
                setCartNotif(true)
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    ) : match.params.type === 'category' ? (
      <div className="notnav">
        {found.map(product => (
          <div key={product.id}>
            <div>{product.name}</div>
            <img src={product.imageURL} />
            <div>{product.description}</div>
            <div>{product.condition}</div>
            <div>${product.price}</div>
            <div>Stock{product.stock}</div>
            <button type="submit" onClick={() => addWish(product)}>
              Add To Wishlist
            </button>
            <button
              type="submit"
              onClick={() => {
                addCart(product)
                setCartNotif(true)
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    ) : (
      <div className="notnav">
        {found.map(user => <Link to={`/user/${user.id}`}>{user.email}</Link>)}
      </div>
    )
  }
}

const mapState = ({categories}) => {
  return {
    categories
  }
}

const mapDispatch = dispatch => {
  return {
    addCart: cart => dispatch(addToCart(cart)),
    addWish: wishlist => dispatch(addToWishlist(wishlist))
  }
}

export default connect(mapState, mapDispatch)(Search)
