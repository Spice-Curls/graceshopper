import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserProducts} from '../store/index'

class userProducts extends Component {
  componentDidMount() {
    this.props.getUserProducts(this.props.user.id)
  }
  render() {
    const {userProducts} = this.props
    if (!userProducts) {
      return <h1>No items</h1>
    }
    return (
      <div>
        {userProducts.map(product => {
          return <div key={product.id}>{product.name}</div>
        })}
      </div>
    )
  }
}

const mapStateToProps = ({user, userProducts}) => {
  return {
    user,
    userProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProducts: userId => dispatch(getUserProducts(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(userProducts)
