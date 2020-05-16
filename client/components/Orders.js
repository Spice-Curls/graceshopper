import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getOrders} from '../store/index'

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.user.id)
  }

  render() {
    const {orders} = this.props
    if (orders.length === 0) {
      return <h1 className="notnav">No orders</h1>
    }
    return (
      <div className="notnav">
        <h1>Your Orders</h1>
        <ul>
          {orders &&
            orders.map(order => (
              <li key={order.id}>
                <div>Order ID: {order.id}</div>
                <div>Shipping to: {order.shippingAddress}</div>
                <div>
                  Items:
                  <ul>
                    {order.cartItems.map(item => (
                      <li key={item.id}>
                        {item.product.name}({item.quantity})
                      </li>
                    ))}
                  </ul>
                  <div>Order total: ${order.totalAmount}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

const mapState = ({user, orders}) => {
  return {
    user,
    orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: id => dispatch(getOrders(id))
  }
}

export default connect(mapState, mapDispatch)(Orders)
