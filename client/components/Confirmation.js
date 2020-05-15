import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'

class Confirmation extends Component {
  constructor() {
    super()
    this.state = {
      cartItems: [],
      loaded: false
    }
  }
  async componentDidMount() {
    if (this.props.user.id) {
      this.setState({cartItems: this.props.cartItems})
    } else {
      this.setState({
        cartItems: JSON.parse(window.localStorage.getItem('cart'))
      })
      window.localStorage.removeItem('cart')
    }
  }

  async componentDidUpdate(prev) {
    if (prev !== this.props) {
      this.setState({loaded: true})
    }
  }

  render() {
    const {loaded, cartItems} = this.state
    const {orders} = this.props
    return !loaded ? (
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    ) : (
      <div>
        <h1>Your order has been received!</h1>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.product.name}({item.quantity})
            </li>
          ))}
          <h2>Total price: ${orders.totalAmount}</h2>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({orders, cartItems, user}) => {
  return {
    orders,
    cartItems,
    user
  }
}

export default connect(mapStateToProps)(Confirmation)
