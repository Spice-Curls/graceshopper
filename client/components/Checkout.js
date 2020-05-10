import React from 'react'
import {connect} from 'react-redux'

const Checkout = state => {
  console.log(state)
  return null
}

const mapState = state => {
  return {
    state
  }
}
export default connect(mapState)(Checkout)
