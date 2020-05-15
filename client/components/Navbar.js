import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//store
import {logout, getCart, getWishlist} from '../store/index'
//components
import SearchBar from './SearchBar'
import user from '../store/user'

const Navbar = props => {
  const {userId, handleClick, isLoggedIn, history, cart, wishlist} = props
  useEffect(() => {
    props.loadCart(userId)
    props.loadWishlist(userId)
  })
  return (
    <div>
      <nav className="navbar">
        {isLoggedIn ? (
          <div className="logged-in">
            <div className="leftnav">
              {/* The navbar will show these links after you log in */}
              <Link to="/">
                <h1>GraceShopper</h1>
              </Link>
            </div>
            <SearchBar history={history} />
            <div className="rightnav">
              <Link
                className={
                  history.location.pathname === `/user/${userId}`
                    ? 'selected'
                    : ''
                }
                to={`/user/${userId}`}
              >
                My Profile
              </Link>
              <Link
                className={
                  history.location.pathname === '/wishlist' ? 'selected' : ''
                }
                to="/wishlist"
              >
                Wishlist ({wishlist})
              </Link>
              <Link
                className={
                  history.location.pathname === '/cart' ? 'selected' : ''
                }
                to="/cart"
              >
                Cart ({cart})
              </Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div className="logged-out">
            {/* The navbar will show these links before you log in */}
            <Link to="/">
              <h1>GraceShopper</h1>
            </Link>
            <SearchBar history={history} />
            <div className="rightnav">
              <Link
                className={
                  history.location.pathname === '/cart' ? 'selected' : ''
                }
                to="/cart"
              >
                Cart ({cart})
              </Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = ({cartItems, user}) => {
  if (!user.id) {
    const items = JSON.parse(window.localStorage.getItem('cart'))
    cartItems = items
  }
  const numInCart =
    cartItems &&
    cartItems.reduce((acc, now) => {
      acc += now.quantity
      return acc
    }, 0)
 const numInWishlist = state.wishlistItems.reduce((acc, now) => {
    acc += now.quantity
    return acc
  }, 0)
  return {
    isLoggedIn: !!user.id,
    userId: user.id,
    cart: numInCart || 0
    wishlist: numInWishlist
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadCart: id => dispatch(getCart(id)),
    loadWishlist: id => dispatch(getWishlist(id))
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
