import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

//components
import NotUserHome from './components/NotUserHome'
import CategoryProducts from './components/CategoryProducts'
import {Login, Signup, UserHome} from './components'
import Cart from './components/Cart'
import Categories from './components/Categories'
import Search from './components/Search'
import UserProducts from './components/UserProducts'
import Wishlist from './components/Wishlist'

//store
import {me} from './store'
import {getCategories} from './store/index'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Categories} />
        <Route
          path="/category/:category?"
          render={props => (
            <div>
              <Categories />
              <CategoryProducts {...props} />
            </div>
          )}
        />
        <Route
          path="/search/:type/:query"
          render={({match}) => <Search match={match} />}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={UserHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/user/:userId" component={UserProfile} />
            <Route exact path="/wishlists/:userId" component={Wishlist} />
            {/* <Route path='/:category' render={ props => <CategoryProducts {...props} /> } /> */}
          </Switch>
        )}
        {!isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/" component={NotUserHome} /> */}
            <Route
              path="/:category?"
              render={props => (
                <div>
                  <NotUserHome />
                  <CategoryProducts {...props} />
                </div>
              )}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(me())
      dispatch(getCategories())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
