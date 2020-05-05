import React from 'react'
import {connect} from 'react-redux'

export const Cart = state => {
  console.log(state)
  return <div>HELLLLLLOOOOOOOOOO</div>
}

const mapState = state => {
  return {
    state
  }
}

export default connect(mapState)(Cart)
