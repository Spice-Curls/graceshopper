import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getUserProducts,
  addProduct,
  editProduct,
  removeProduct
} from '../store/index'
import Popup from 'reactjs-popup'

const initialState = {
  name: '',
  image: null,
  description: '',
  condition: '',
  price: 0,
  categoryId: '',
  stock: 0,
  editAmount: ''
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
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('image', this.state.image)
    formData.append('description', this.state.description)
    formData.append('condition', this.state.condition)
    formData.append('price', this.state.price)
    formData.append('stock', this.state.stock)
    if (this.state.categoryId.length === 0) {
      formData.append('categoryId', this.props.categories[0].id)
    } else {
      formData.append('categoryId', this.state.categoryId)
    }
    this.props.addProduct(this.state, formData, this.props.user.id)
    this.setState(initialState)
  }
  render() {
    const {
      name,
      stock,
      description,
      condition,
      price,
      categoryId,
      editAmount
    } = this.state
    const {userProducts, categories, remove, updateStock} = this.props
    const {addProduct} = this

    return (
      <div className="user-profile">
        <h3>My Products</h3>
        {userProducts &&
          userProducts.map((product, idx) => {
            return (
              <h3 key={idx}>
                {product.name}({product.stock})
                <Popup modal trigger={<a href="#">Edit</a>}>
                  {close => (
                    <div>
                      <form
                        onSubmit={ev => {
                          ev.preventDefault()
                          updateStock(product, editAmount)
                          close()
                        }}
                      >
                        <label>Edit Amount</label>
                        <input
                          type="number"
                          value={editAmount}
                          required
                          onChange={ev =>
                            this.setState({editAmount: ev.target.value})
                          }
                        />
                        <button>Update Stock</button>
                      </form>
                      <form
                        onSubmit={ev => {
                          ev.preventDefault()
                          remove(product)
                          close()
                        }}
                      >
                        <button>Remove Item</button>
                      </form>
                    </div>
                  )}
                </Popup>
              </h3>
            )
          })}
        <br />
        <form onSubmit={addProduct} className="product-form">
          <input
            type="text"
            name="name"
            placeholder="What are you selling?"
            value={name}
            onChange={ev => this.setState({name: ev.target.value})}
            required
          />
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={ev => this.setState({price: ev.target.value})}
            required
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
            required
          />
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={ev => this.setState({stock: ev.target.value})}
          />
          <textarea
            rows="3"
            column="80"
            type="text"
            placeholder="Describe your item"
            value={description}
            onChange={ev => this.setState({description: ev.target.value})}
            required
          />
          <label>Condition:</label>
          <select
            name="condition"
            value={condition}
            onChange={ev => this.setState({condition: ev.target.value})}
            required
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
    addProduct: (product, formData, userId) =>
      dispatch(addProduct(product, formData, userId)),
    remove: product => dispatch(removeProduct(product)),
    updateStock: (product, amount) => dispatch(editProduct(product, amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
