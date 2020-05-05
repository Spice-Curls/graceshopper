import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

//components
import NotUserHome from './components/NotUserHome'
import CategoryProducts from './components/CategoryProducts'
import {Login, Signup, UserHome} from './components'
import Cart from './components/Cart'

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
        <Route
          path="/:category?"
          render={props => (
            <div>
              <NotUserHome />
              <CategoryProducts {...props} />
            </div>
          )}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/" component={UserHome} />
            <Route exact path="/:cart?" component={Cart} />
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
            <Route exact path="/:cart?" component={Cart} />
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
