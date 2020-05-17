import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//store
import {logout, getCart, getWishlist} from '../store/index'
//components
import SearchBar from './SearchBar'
import user from '../store/user'
//fontawesome
import {faList} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Navbar = props => {
  const {
    userId,
    handleClick,
    isLoggedIn,
    history,
    cart,
    wishlist,
    closed,
    setClosed
  } = props
  useEffect(() => {
    props.loadCart(userId)
    if (!userId) {
      return
    }
    props.loadWishlist(userId)
  })
  return (
    <div>
      <nav className="navbar">
        {isLoggedIn ? (
          <div>
            <div className="leftnav">
              {/* The navbar will show these links after you log in */}
              <FontAwesomeIcon
                className="icon"
                onClick={() => setClosed(!closed)}
                icon={faList}
                size="3x"
              />
              <Link to="/">Free Market</Link>
            </div>
            <SearchBar history={history} />
            <div className="rightnav">
              <Link to={`/user/${userId}`}>My Profile</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/wishlist">Wishlist ({wishlist})</Link>
              <Link to="/cart">Cart ({cart})</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="leftnav">
              <FontAwesomeIcon
                className="icon"
                onClick={() => setClosed(!closed)}
                icon={faList}
                size="3x"
              />
              <Link to="/">Free Market</Link>
            </div>
            <SearchBar history={history} />
            <div className="rightnav">
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

const mapState = ({user, cartItems, wishlistItems}) => {
  if (!user.id) {
    const items = JSON.parse(window.localStorage.getItem('cart'))
    cartItems = items
    const wishlist = JSON.parse(window.localStorage.getItem('wishlist'))
    wishlistItems = wishlist
  }
  const numInCart =
    cartItems &&
    cartItems.reduce((acc, now) => {
      acc += now.quantity
      return acc
    }, 0)
  const numInWishlist =
    wishlistItems &&
    wishlistItems.reduce((acc, now) => {
      acc += now.quantity
      return acc
    }, 0)
  return {
    isLoggedIn: !!user.id,
    userId: user.id,
    cart: numInCart || 0,
    wishlist: numInWishlist || 0
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
