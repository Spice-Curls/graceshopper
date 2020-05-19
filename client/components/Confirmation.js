import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'

//thunks

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
      this.props.user.email = this.props.orders.email
    }
  }

  async componentDidUpdate(prev) {
    if (prev !== this.props) {
      this.setState({loaded: true})
    }
  }

  render() {
    const {loaded, cartItems} = this.state
    const {orders, user} = this.props
    return !loaded ? (
      <Loader
        className="notnav"
        type="ThreeDots"
        color="#2BAD60"
        height="100"
        width="100"
      />
    ) : (
      <div className="notnav">
        <h1>Your order has been received!</h1>
        <h1>Order ID: {orders[0].newOrder.id ? orders[0].newOrder.id : ''}</h1>
        <h1>Confirmation email sent to: {orders[0].email}</h1>
        <ul>
          {cartItems &&
            cartItems.map(item => (
              <li key={item.id}>
                {item.product.name}({item.quantity})
              </li>
            ))}
          <h2>Total price: ${orders[0].newOrder.totalAmount}</h2>
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
