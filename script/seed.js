'use strict'

const {
  db,
  User,
  Category,
  Product,
  CartItem,
  WishlistItem,
  Order
} = require('../server/db')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {email: 'cody@email.com', password: '123'},
    {email: 'murphy@email.com', password: '123'}
  ]

  const [cody, murphy] = await Promise.all(
    users.map(user => User.create({email: user.email, password: user.password}))
  )

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)

  const categories = [
    {name: 'Appliances'},
    {name: 'Arts, Crafts & Sewing'},
    {name: 'Automotive Parts & Accessories'},
    {name: 'Baby'},
    {name: 'Beauty & Personal Care'},
    {name: 'Books'},
    {name: 'CDs & Vinyl'},
    {name: 'Cell Phones & Accessories'},
    {name: 'Clothing, Shoes & Jewelry'},
    {name: 'Collectibles & Fine Art'},
    {name: 'Computers'},
    {name: 'Electronics'},
    {name: 'Garden & Outdoor'},
    {name: 'Grocery & Gourmet Food'},
    {name: 'Handmade'},
    {name: 'Health, Household & Baby Care'},
    {name: 'Home & Kitchen'},
    {name: 'Industrial & Scientific'},
    {name: 'Luggage & Travel Gear'},
    {name: 'Musical Instruments'},
    {name: 'Office Products'},
    {name: 'Pet Supplies'},
    {name: 'Software'},
    {name: 'Sports & Outdoors'},
    {name: 'Tools & Home Improvement'},
    {name: 'Toys & Games'},
    {name: 'Vehicles'},
    {name: 'Video Games'}
  ]
  const [electronics, clothing, household] = await Promise.all(
    categories.map(category =>
      Category.create({
        name: category.name
      })
    )
  )

  const products = [
    {
      name: 'Macbook Pro',
      imageURL:
        'https://cdn.vox-cdn.com/thumbor/JB8REiNjTmvnU0_L7aQbnnL4jsY=/0x0:5205x3470/1820x1213/filters:focal(2187x1319:3019x2151):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/60364845/vpavic_180713_2741_0017.0.jpg',
      description: '15" Macbook Pro with quieter keyboard',
      condition: 'Used - Like New or Open Box',
      price: 1000.0,
      sellerId: cody.id,
      categoryId: electronics.id,
      stock: 90
    },
    {
      name: 'Leather Jacket from Zara',
      imageURL:
        'https://rockstarjackets.com/wp-content/uploads/2020/04/Zara-Woman-Leather-Jacket.jpg',
      description: 'Used black leather jacket from Zara',
      condition: 'Used - Very Good',
      price: 50.0,
      sellerId: murphy.id,
      categoryId: clothing.id,
      stock: 80
    },
    {
      name: 'Loveseat Sofa',
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/715-8Ddm%2BuL._AC_SL1500_.jpg',
      description: 'Moving. Need someone to get this sofa off of my hands',
      condition: 'Used - Acceptable',
      price: 100.0,
      sellerId: murphy.id,
      categoryId: household.id,
      stock: 70
    }
  ]
  const [macbook, jacket, sofa] = await Promise.all(
    products.map(product =>
      Product.create({
        name: product.name,
        imageURL: product.imageURL,
        description: product.description,
        condition: product.condition,
        price: product.price,
        sellerId: product.sellerId,
        categoryId: product.categoryId,
        stock: product.stock
      })
    )
  )

  const order1 = await Order.create({
    shippingAddress: '123 hello street',
    billingAddress: '123 hello street',
    totalAmount: 1000,
    buyerId: murphy.id
  })

  await CartItem.create({
    productId: jacket.id,
    quantity: 1,
    buyerId: murphy.id,
    orderId: order1.id
  })
  await CartItem.create({
    productId: macbook.id,
    quantity: 2,
    buyerId: murphy.id,
    orderId: order1.id
  })

  // const codyWishlist = await Wishlist.create({buyerId: cody.id})

  await WishlistItem.create({
    productId: sofa.id,
    quantity: 1,
    buyerId: cody.id,
    orderId: order1.id
  })
  await WishlistItem.create({
    productId: macbook.id,
    quantity: 1,
    buyerId: cody.id,
    orderId: order1.id
  })
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
