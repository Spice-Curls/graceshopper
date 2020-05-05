import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Categories from './Categories'

/**
 * COMPONENT
 */
export const NotUserHome = ({email}) => {
  return (
    <div>
      <h3>Welcome {email}</h3>
      <Categories />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(NotUserHome)

/**
 * PROP TYPES
 */
NotUserHome.propTypes = {
  email: PropTypes.string
}
