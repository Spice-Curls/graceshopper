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
import UserProfile from './components/UserProfile'
import Wishlist from './components/Wishlist'
import Checkout from './components/Checkout'

//store
import {me} from './store'
import {getCategories} from './store/index'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()

    // localStorage.setItem(
    //   'cart',
    //   JSON.stringify(
    //     {
    //       id: 'f6e6da3a-ba4c-4ab5-a12a-9d57df7c0871',
    //       quantity: 1,
    //       createdAt: '2020-05-12T21:35:55.615Z',
    //       updatedAt: '2020-05-12T21:35:55.615Z',
    //       buyerId: '861d0f9d-db65-48a7-a553-0467999c4fbd',
    //       productId: '4abeaf79-c960-4af9-ae2c-399777ce0f38',
    //       orderId: '16d83814-9591-4e88-acda-70a779c2ae38',
    //     },
    //     {
    //       id: '8070b3fb-267b-4938-b128-8658a813c3dc',
    //       quantity: 2,
    //       createdAt: '2020-05-12T21:35:55.618Z',
    //       updatedAt: '2020-05-12T21:35:55.618Z',
    //       buyerId: '861d0f9d-db65-48a7-a553-0467999c4fbd',
    //       productId: 'dc3d2e88-237a-48b9-b610-3dc10d709cd2',
    //       orderId: '16d83814-9591-4e88-acda-70a779c2ae38',
    //     }
    //   )
    // )
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          exact
          path="/"
          render={() => (
            <div className="categoriesandproducts">
              <Categories />
            </div>
          )}
        />
        <Route
          path="/category/:category?"
          render={props => (
            <div className="categoriesandproducts">
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
            <Route path="/checkout/:userId" component={Checkout} />
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
