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
    {email: 'murphy@email.com', password: '123'},
    {email: 'jonathan@email.com', password: '123'},
    {email: 'stanley@email.com', password: '123'},
    {email: 'dan@email.com', password: '123'},
    {email: 'tam@email.com', password: '123'},
    {email: 'joe@email.com', password: '123'}
  ]

  const [cody, murphy, jon, stan, dan, tam, joe] = await Promise.all(
    users.map(user => User.create({email: user.email, password: user.password}))
  )

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)

  const categories = [
    {name: 'Appliances'},
    {name: 'Arts, Crafts & Sewing'},
    {name: 'Automotive Parts & Accessories'},
    {name: 'Beauty & Personal Care'},
    {name: 'Books'},
    {name: 'Cell Phones & Accessories'},
    {name: 'Clothing, Shoes & Jewelry'},
    {name: 'Collectibles & Fine Art'},
    {name: 'Electronics'},
    {name: 'Garden & Outdoor'},
    {name: 'Handmade'},
    {name: 'Health, Household & Baby Care'},
    {name: 'Home & Kitchen'},
    {name: 'Luggage & Travel Gear'},
    {name: 'Musical Instruments'},
    {name: 'Office Products'},
    {name: 'Pet Supplies'},
    {name: 'Sports & Outdoors'},
    {name: 'Tools & Home Improvement'},
    {name: 'Toys & Games'}
  ]

  const [
    appliances,
    arts,
    automotive,
    beauty,
    books,
    cell,
    clothing,
    collectibles,
    electronics,
    garden,
    handmade,
    health,
    home,
    luggage,
    muscial,
    office,
    pet,
    sports,
    tools,
    toys
  ] = await Promise.all(
    categories.map(category =>
      Category.create({
        name: category.name
      })
    )
  )

  const products = [
    {
      name: 'Frigidaire Portable Retro 6-can Mini Fridge',
      imageURL: 'https://i.ebayimg.com/images/g/XSQAAOSwCuBcXC2s/s-l1600.png',
      description:
        'This Frigidaire Portable Retro 6-can Mini Fridge is in great working condition. The unit has been fully tested and is completely functional.',
      condition: 'Used - Very Good',
      price: 44.99,
      sellerId: cody.id,
      categoryId: appliances.id,
      stock: 1
    },
    {
      name: '4ft 3 prong/wire Dryer Cord',
      imageURL: 'https://i.ebayimg.com/images/g/iVgAAOSwnKFeSfcW/s-l1600.jpg',
      description: 'Certified Electric Dryer Cord 4Ft Model: 90-1020',
      condition: 'New',
      price: 9.6,
      sellerId: murphy.id,
      categoryId: appliances.id,
      stock: 359
    },
    {
      name: 'Original Motivational Painting Acrylic',
      imageURL: 'https://i.ebayimg.com/images/g/MLwAAOSwVhxeuL6s/s-l1600.jpg',
      description: 'Canvas 8" by 10"',
      condition: 'New',
      price: 38.0,
      sellerId: jon.id,
      categoryId: arts.id,
      stock: 1
    },
    {
      name: 'Banksy Print Balloon Girl Love',
      imageURL: 'https://i.ebayimg.com/images/g/BKwAAOSwSchdf8v-/s-l1600.jpg',
      description: 'Street Art Graffiti Stencil',
      condition: 'New',
      price: 75.99,
      sellerId: jon.id,
      categoryId: arts.id,
      stock: 1
    },
    {
      name: 'OBD2 Scanner Check Engine Fault Diagnostic Scan Tool',
      imageURL: 'https://i.ebayimg.com/images/g/phUAAOSwutZefZdl/s-l1600.jpg',
      description:
        'This OBD2 scanner is designed for reading and erasing trouble code,fast scan and clear trouble codes.',
      condition: 'New',
      price: 17.95,
      sellerId: stan.id,
      categoryId: automotive.id,
      stock: 17
    },
    {
      name: 'Car Cover Water Dust Resistant UV Snow Protection',
      imageURL: 'https://i.ebayimg.com/images/g/bkYAAOSwY0lXTTpE/s-l1600.jpg',
      description:
        'COPAP nylon fabric universal car cover effectively prevent dust into your car and keep car inside and ouside clean and tidy. With front and rear elastic hems to cover your car tightly.',
      condition: 'New',
      price: 18.89,
      sellerId: dan.id,
      categoryId: automotive.id,
      stock: 85
    },
    {
      name: 'Beauty Blender Sponge makeup tool',
      imageURL: 'https://i.ebayimg.com/images/g/HxIAAOSwOQJekTtT/s-l1600.jpg',
      description:
        '1 Nude Pink color Beauty Blender with Cleaning Solid in Original Package',
      condition: 'New',
      price: 13.0,
      sellerId: tam.id,
      categoryId: beauty.id,
      stock: 23
    },
    {
      name:
        'Makeup Brush Set Cosmetic Lip Foundation Eyebrow Blush Powder Kabuki Beauty',
      imageURL:
        'https://i.ebayimg.com/00/s/ODAwWDgwMA==/z/mzUAAOSw3Ulcnbil/$_12.JPG?set_id=880000500F',
      description:
        'Contains 10 PCS different function brushes, suitable for a wide rang of the makeup needs for professional or at-home use.',
      condition: 'New',
      price: 4.69,
      sellerId: tam.id,
      categoryId: beauty.id,
      stock: 1013
    },
    {
      name:
        'Build Your Own Lot Paperback Books / Novels 500+ Romance Suspense Thriller Crime',
      imageURL: 'https://i.ebayimg.com/images/g/wGQAAOSwGIVedgzN/s-l1600.jpg',
      description:
        'All books in this listing are in USED, but VERY GOOD condition. Books are from a personal collection and were read once by an avid Reader and have been boxed ever since.',
      condition: 'Used - Very Good',
      price: 25,
      sellerId: joe.id,
      categoryId: books.id,
      stock: 500
    },
    {
      name:
        'Cravings: Recipes for All the Food You Want to Eat, by Chrissy Teigen',
      imageURL: 'https://i.ebayimg.com/images/g/WPsAAOSwd59evY~L/s-l1600.jpg',
      description:
        'For years, she’s been collecting, cooking, and Instagramming her favorite recipes, and here they are.',
      condition: 'Used - Like New or Open Box',
      price: 3.59,
      sellerId: cody.id,
      categoryId: books.id,
      stock: 2
    },
    {
      name:
        'For iPhone 6 6s 7 8 Plus Case Liquid Glitter Bling Phone Cover + Tempered Glass',
      imageURL: 'https://i.ebayimg.com/images/g/z7sAAOSwZSBen2mm/s-l1600.jpg',
      description:
        'Say goodbye to plain and dull looking case! Watching the glitters flowing freely in this stunning case is just breathtaking and stress relieving, bringing you a whole new experience and show off to your friends.',
      condition: 'New',
      price: 9.95,
      sellerId: murphy.id,
      categoryId: cell.id,
      stock: 8
    },
    {
      name:
        '360° Mount Holder Car Windshield Stand For Mobile Cell Phone GPS iPhone Samsung',
      imageURL: 'https://i.ebayimg.com/images/g/VLgAAOSwgZ1XtBIU/s-l1600.jpg',
      description:
        'For Apple iPhone XS Max, For Apple iPhone SE, For Samsung Galaxy S6 edge+, For Samsung Galaxy S7, For Huawei P9 lite, For Huawei P9, For Huawei P8',
      condition: 'New',
      price: 8.73,
      sellerId: jon.id,
      categoryId: cell.id,
      stock: 10
    },
    {
      name:
        'Toddler Kid Baby Girls Strap Romper Jumpsuit Heart Harem Pants Trousers',
      imageURL: 'https://i.ebayimg.com/images/g/FAwAAOSwG7Fakhnr/s-l1600.jpg',
      description:
        '100% Brand New and High Quality Fashionable and cute,soft and comfortable',
      condition: 'New',
      price: 9.98,
      sellerId: stan.id,
      categoryId: clothing.id,
      stock: 73
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
      stock: 1
    },
    {
      name: 'Funko POP! The Mandalorian - Baby Yoda The Child Vinyl Figure',
      imageURL: 'https://i.ebayimg.com/images/g/bLMAAOSwyp5en45A/s-l1600.png',
      description: 'Seller assumes all responsibility for this listing.',
      condition: 'New',
      price: 15.79,
      sellerId: dan.id,
      categoryId: collectibles.id,
      stock: 20
    },
    {
      name:
        'Miniatures Mineral Collection Crafters1/2 lb Mix Natural Gems Crystals Specimens',
      imageURL: 'https://i.ebayimg.com/images/g/pNQAAOSw8S9a26Tn/s-l1600.jpg',
      description: 'Natural Crystal',
      condition: 'New',
      price: 9.95,
      sellerId: stan.id,
      categoryId: collectibles.id,
      stock: 200
    },
    {
      name: '15" Macbook Pro',
      imageURL:
        'https://cdn.vox-cdn.com/thumbor/JB8REiNjTmvnU0_L7aQbnnL4jsY=/0x0:5205x3470/1820x1213/filters:focal(2187x1319:3019x2151):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/60364845/vpavic_180713_2741_0017.0.jpg',
      description:
        'Apple Macbook Air 15" Touch ID Intel i5 8GB 128GB 2019 MVFH2LL/A Space Gray',
      condition: 'Used - Like New or Open Box',
      price: 1099.0,
      sellerId: cody.id,
      categoryId: electronics.id,
      stock: 4
    },
    {
      name: 'Nintendo Switch Lite | Gray, Yellow, Turquoise (New)',
      imageURL: 'https://i.ebayimg.com/images/g/8DkAAOSwKp1d7xPf/s-l1600.jpg',
      description:
        "Introducing Nintendo Switch™ Lite, a new version of the Nintendo Switch system that's optimized for personal, handheld play.",
      condition: 'New',
      price: 249.99,
      sellerId: tam.id,
      categoryId: electronics.id,
      stock: 37
    },
    {
      name:
        'Solar Garden Stakes Water Faucet Fairy Light Yard Lawn Art Outdoor Home Decor',
      imageURL: 'https://i.ebayimg.com/images/g/tmYAAOSwqHtehkEj/s-l1600.jpg',
      description:
        'Extend your love of industrial decor to the garden with this Solar Faucet Water Light Collection.',
      condition: 'New',
      price: 39.99,
      sellerId: tam.id,
      categoryId: garden.id,
      stock: 5
    },
    {
      name:
        'Fairy Garden Gnome Door 8 1/2” tall and 4 Windows Set Tree Yard Decor NEW',
      imageURL: 'https://i.ebayimg.com/images/g/1XgAAOSw2QhdlCAh/s-l1600.jpg',
      description:
        'Comes with 1 Door and 4 windows. Each item has a key hole hook on back for hanging. Door measures about 8 1/2” tall by 6 1/2”. Each window measures 3 1/2” tall by 2 1/2” wide.',
      condition: 'New',
      price: 24.99,
      sellerId: joe.id,
      categoryId: garden.id,
      stock: 125
    },
    {
      name:
        'Face Masks Handmade Washable 100% Cotton Fabric NEW 13 colors Free Shipping',
      imageURL: 'https://i.ebayimg.com/images/g/rXIAAOSwGLdetHHG/s-l1600.jpg',
      description:
        'Handmade, Washable, multi-layer Face Mask with Elastic Ear loop',
      condition: 'New',
      price: 7.95,
      sellerId: cody.id,
      categoryId: handmade.id,
      stock: 19
    },
    {
      name:
        'Handmade Soap Choose Your Scent Natural Homemade Bath Bar Lavender and more',
      imageURL: 'https://i.ebayimg.com/images/g/kgYAAOSwZtRbziqa/s-l1600.jpg',
      description:
        'Beaver Moon bath bars are made from scratch by cold process.',
      condition: 'Used - Acceptable',
      price: 29.99,
      sellerId: jon.id,
      categoryId: handmade.id,
      stock: 87
    },
    {
      name:
        'Huggies Natural Care Sensitive Baby Wipes, Unscented, 3 Flip-Top Packs (168 )',
      imageURL: 'https://i.ebayimg.com/images/g/xJ0AAOSwGPdevbJ9/s-l1600.jpg',
      description: 'All Natural!',
      condition: 'New',
      price: 8.95,
      sellerId: stan.id,
      categoryId: health.id,
      stock: 3
    },
    {
      name:
        'Safety 1st Nursery Health Care Grooming Kit 6 Pieces Toothbrush Nail Clipper Bag',
      imageURL: 'https://i.ebayimg.com/images/g/7nwAAOSw7HpevZbD/s-l1600.jpg',
      description:
        "Care for your baby with confidence with this thoughtfully chosen selection of parents' favorites.",
      condition: 'New',
      price: 21.99,
      sellerId: dan.id,
      categoryId: health.id,
      stock: 21
    },
    {
      name: 'Loveseat Sofa',
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/715-8Ddm%2BuL._AC_SL1500_.jpg',
      description: 'Moving. Need someone to get this sofa off of my hands',
      condition: 'Used - Acceptable',
      price: 100.0,
      sellerId: murphy.id,
      categoryId: home.id,
      stock: 1
    },
    {
      name:
        '12Pcs 3D Butterfly LED Wall Stickers Glowing Bedroom DIY Home Decor Night light',
      imageURL: 'https://i.ebayimg.com/images/g/WOMAAOSwS8BeeaAr/s-l1600.jpg',
      description:
        'Great for any occasion or decorating need, very good used in bedroom, home, as a gift, bars, cafes, restaurants, and other romantic places',
      condition: 'New',
      price: 12.97,
      sellerId: tam.id,
      categoryId: home.id,
      stock: 293
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

  // const order1 = await Order.create({
  //   shippingAddress: '123 hello street',
  //   billingAddress: '123 hello street',
  //   totalAmount: 1000,
  //   buyerId: murphy.id,
  // })

  // await CartItem.create({
  //   productId: jacket.id,
  //   quantity: 1,
  //   buyerId: murphy.id,
  //   orderId: order1.id,
  // })
  // await CartItem.create({
  //   productId: macbook.id,
  //   quantity: 2,
  //   buyerId: murphy.id,
  //   orderId: order1.id,
  // })

  // await WishlistItem.create({
  //   productId: sofa.id,
  //   quantity: 1,
  //   buyerId: cody.id,
  //   orderId: order1.id,
  // })
  // await WishlistItem.create({
  //   productId: macbook.id,
  //   quantity: 1,
  //   buyerId: cody.id,
  //   orderId: order1.id,
  // })
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
