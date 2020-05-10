import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//store
import {logout} from '../../store/index'
//components
import SearchBar from '../SearchBar'
import user from '../../store/user'

import styles from './navbar.css'

const Navbar = ({userId, handleClick, isLoggedIn, history}) => (
  <div>
    <nav className="navbar">
      <Link to="/">GraceShopper</Link>
      {isLoggedIn ? (
        <div>
          <div className="leftnav">
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
          </div>
          <SearchBar history={history} />
          <div className="rightnav">
            <Link to={`/user/${userId}`}>My Profile</Link>
            <Link to={`/wishlists/${userId}`}>Wishlist</Link>
            <Link to="/cart">Cart</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <SearchBar history={history} />
          <div className="rightnav">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
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
