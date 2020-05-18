import React from 'react'
import {Link} from 'react-router-dom'
//fontawesome
import {faWindowClose} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const ItemAdded = props => {
  const {cartNotif, setCartNotif} = props
  return (
    <div className={cartNotif ? 'slide-in-top itemadded' : 'closed itemadded'}>
      <FontAwesomeIcon
        onClick={() => setCartNotif(false)}
        className="closeicon"
        icon={faWindowClose}
        size="lg"
      />
      <h1>Item added to cart</h1>
      <Link to="/checkout">Proceed to checkout</Link>
    </div>
  )
}

export default ItemAdded
