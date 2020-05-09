import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserProducts, addProduct} from '../store/index'

const initialState = {
  name: '',
  image: null,
  description: '',
  condition: '',
  price: '',
  categoryId: ''
}

class UserProfile extends Component {
  constructor() {
    super()
    this.state = initialState
    this.addProduct = this.addProduct.bind(this)
  }
  componentDidMount() {
    this.props.getUserProducts(this.props.user.id)
  }
  addProduct(ev) {
    ev.preventDefault()
    this.props.addProduct(this.state, this.props.user.id)
    this.setState(initialState)
  }
  render() {
    const {name, image, description, condition, price, categoryId} = this.state
    const {userProducts, categories} = this.props
    const {addProduct} = this

    return (
      <div>
        <div>My Products</div>
        {userProducts &&
          userProducts.map((product, idx) => {
            return <div key={idx}>{product.name}</div>
          })}
        <br />
        <form onSubmit={addProduct}>
          <input
            name="name"
            placeholder="What are you selling?"
            value={name}
            onChange={ev => this.setState({name: ev.target.value})}
          />
          <input
            name="price"
            placeholder="Price"
            value={price}
            onChange={ev => this.setState({price: ev.target.value})}
          />
          <label>Category</label>
          <select
            value={categoryId}
            onChange={ev => this.setState({categoryId: ev.target.value})}
          >
            {categories.map(category => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )
            })}
          </select>
          <label>Add Image:</label>
          <input
            type="file"
            name="image"
            onChange={ev => this.setState({image: ev.target.files[0]})}
          />
          <textarea
            rows="3"
            column="80"
            type="text"
            placeholder="Describe your item"
            value={description}
            onChange={ev => this.setState({description: ev.target.value})}
          />
          <label>Condition:</label>
          <select
            name="condition"
            value={condition}
            onChange={ev => this.setState({condition: ev.target.value})}
          >
            <option value="" defaultValue hidden>
              --Select--
            </option>
            <option value="New">New</option>
            <option value="Used - Like New or Open Box">
              Used - Like New or Open Box
            </option>
            <option value="Used - Very Good">Used - Very Good</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Acceptable">Used - Acceptable</option>
          </select>
          <button>New Post</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({user, userProducts, categories}) => {
  return {
    user,
    userProducts,
    categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProducts: userId => dispatch(getUserProducts(userId)),
    addProduct: (product, userId) => dispatch(addProduct(product, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
