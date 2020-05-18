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
    musical,
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
        '100 Brand New and High Quality Fashionable and cute,soft and comfortable',
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
        'Face Masks Handmade Washable 100 Cotton Fabric NEW 13 colors Free Shipping',
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
    },
    {
      name: 'Samsonite Bartlett Spinner',
      imageURL: 'https://i.ebayimg.com/images/g/l8kAAOSwOvRba7Xt/s-l1600.jpg',
      description:
        'Four, multi-directional spinner wheels for easy mobility. Fully featured interior includes mesh and show pockets for increased organizations.',
      condition: 'New',
      price: 55.99,
      sellerId: joe.id,
      categoryId: luggage.id,
      stock: 511
    },
    {
      name:
        'Duffle Bag Sport Gym Carry On Travel Luggage Shoulder Tote HandBag Waterproof',
      imageURL: 'https://i.ebayimg.com/images/g/Ms8AAOSwkJBdibsc/s-l1600.jpg',
      description:
        'Made of high quality polyester material, more durable. Main compartment with easy-access U-shaped opening.',
      condition: 'New',
      price: 26.9,
      sellerId: joe.id,
      categoryId: luggage.id,
      stock: 15
    },
    {
      name:
        'New Firefly FFTH Semi-Hollow body Guitar Electri Gutiar (Sunburst Color)',
      imageURL: 'https://i.ebayimg.com/images/g/8lgAAOSw2d5etPg0/s-l1600.jpg',
      description:
        'Firefly FFTH Semi-Hollow body Guitars (Sunburst Color) are made of A grade Mahogany body and Maple neck with the beautiful white pearl pickguard. And it has white edge banding on the body.',
      condition: 'New',
      price: 129.99,
      sellerId: dan.id,
      categoryId: musical.id,
      stock: 10
    },
    {
      name:
        'Professional Worlde Panda mini 25-Key USB Keyboard Drum Pad MIDI Controller Gift',
      imageURL:
        'https://miracdiam666.guphotos.com/i/w?u=/images/I/9/I1429/I1429-1-e263-y61u.jpg',
      description:
        '25 velocity-sensitive keys. 8 backlit trigger pads. 4 MIDI control groups.(4 assignable control knobs plus 4 assignable control sliders). 4 banks for different settings. 8 control buttons: C--C Mod, Mod, Bank, Prog, Pi tch down / Pi tch up, Octave down / Octave up. Plug and Play USB 2.0 cable, no need of driver installation. USB bus powered - no additional power cable needed.',
      condition: 'New',
      price: 62.99,
      sellerId: dan.id,
      categoryId: musical.id,
      stock: 30
    },
    {
      name:
        'Office Desk Chair Computer PU Leather Luxury Home Black Executive Swivel',
      imageURL: 'https://i.ebayimg.com/images/g/SogAAOSwbZpewSXY/s-l1600.jpg',
      description:
        'This executive chair adopts excellent steel construction, wear-resistant casters and soft PU leather wrapped. Also equip with a footrest, pull outwards to relax legs on or fully withdrawn for work, gaming or study.',
      condition: 'New',
      price: 69.99,
      sellerId: cody.id,
      categoryId: office.id,
      stock: 27
    },
    {
      name:
        'Crenova A4 Thermal Laminator Machine + 20 Laminating Pouches for Home Office',
      imageURL: 'https://i.ebayimg.com/images/g/~oMAAOSw4ThdZdzt/s-l1600.jpg',
      description:
        'Crenova A4 Thermal Laminator Machine + 20 Laminating Pouches for Home Office',
      condition: 'New',
      price: 49.99,
      sellerId: murphy.id,
      categoryId: office.id,
      stock: 84
    },
    {
      name:
        'Donut Plush Pet Dog Cat Bed Fluffy Soft Warm Calming Bed Sleeping Kennel Nest',
      imageURL: 'https://i.ebayimg.com/images/g/80gAAOSwLrtd08b9/s-l1600.jpg',
      description:
        'Donut round design puppy bed,4 size options ,suitable for small,medium and large pets. Made of faux shag fur ,and filling with quality airloft fibers ,the self-warming luxury dog bed brings a superior comfort,and the raised rim creates a sense of security and provides head and neck support,animals will have full, restful sleep for improved behavior and better health.',
      condition: 'New',
      price: 14.99,
      sellerId: jon.id,
      categoryId: pet.id,
      stock: 72
    },
    {
      name:
        'Ultra Quiet Rechargeable Pet Dog/Cat Hair Trimmer Animal Grooming Clippers',
      imageURL: 'https://i.ebayimg.com/images/g/55gAAOSwLdtesJQW/s-l1600.jpg',
      description:
        "Sharp and high precision blades offer superior strength to enable a powerful cutting performance. Effortlessly trim your pet's hair, never hurt your cute dog or cat's skin, doesn't rust and durable for long time use.",
      condition: 'New',
      price: 34.99,
      sellerId: stan.id,
      categoryId: pet.id,
      stock: 104
    },
    {
      name: 'Five Ten Rock Climbing Shoes Mens GYM MASTER',
      imageURL: 'https://i.ebayimg.com/images/g/zvAAAOSwCWZdhCLA/s-l1600.jpg',
      description:
        "The Gym Master is designed specifically for gym rental fleets. Based off of the Wall Master, it has the same fit but with exterior size icons for easy fitting and a machine-washable canvas upper, which won't stretch out with use.",
      condition: 'Used - Very Good',
      price: 27.99,
      sellerId: dan.id,
      categoryId: sports.id,
      stock: 104
    },
    {
      name:
        '3-4 Person Outdoor Camping Waterproof Automatic Instant Pop Up Tent Camouflage',
      imageURL: 'https://i.ebayimg.com/images/g/gxQAAOSwiYFXDgY3/s-l1600.jpg',
      description:
        'Waterproof, pop up type, easy to use and fold. Two mesh windows provides maximum ventilation, one is on the side, the other one is on the top. Large zippered door for convenient access. Great for camping, hiking, climbing, picnic or daily use at home.',
      condition: 'New',
      price: 31.98,
      sellerId: tam.id,
      categoryId: sports.id,
      stock: 33
    },
    {
      name:
        'AquaDance® Antimicrobial High Pressure Shower Head with 6-Settings',
      imageURL: 'https://i.ebayimg.com/images/g/IJIAAOSw8lpZMG7E/s-l1600.jpg',
      description:
        '6-Spray Pattern, Microban® Nozzle Protection, Anti-Clog, Antimicrobial, High-Pressure, Lifetime Warranty, Rub-Clean Jets, Tools-Free Installation, Multi-Position, Wall Mount',
      condition: 'New',
      price: 44.98,
      sellerId: cody.id,
      categoryId: tools.id,
      stock: 67
    },
    {
      name:
        'Large Lot of Miscellaneous Tools - Selling here instead of Yard Sale!',
      imageURL: 'https://i.ebayimg.com/images/g/NeYAAOSw2QZeviaX/s-l1600.jpg',
      description:
        "I was going to have a spring yard sale, had been setting this stuff aside in boxes and pricing it out.  With our current situation, no chance for that so it's for sale here, one lot, one flat rate priority box at a time.  What you see is what you get!",
      condition: 'Used - Good',
      price: 49.99,
      sellerId: joe.id,
      categoryId: tools.id,
      stock: 1
    },
    {
      name:
        'Pink Princess Castle Cute Playhouse Children Kids Play Tent Outdoor Toys',
      imageURL: 'https://i.ebayimg.com/images/g/51AAAOSw11BdZysc/s-l1600.jpg',
      description:
        'Our cutest princess tent offers your little angels a private place and let them rest, read or dream inside it!',
      condition: 'New',
      price: 27.99,
      sellerId: jon.id,
      categoryId: toys.id,
      stock: 19
    },
    {
      name:
        'Super Mario Magikoopa Kamek Plush 7" Stuffed Animal Magic Figure Soft Toy',
      imageURL: 'https://i.ebayimg.com/images/g/GXQAAOSwEUVZYtqM/s-l1600.jpg',
      description:
        'Very soft high quality plush. Makes a perfect gift to any Super Mario Bros. Fan or Children.',
      condition: 'New',
      price: 10.95,
      sellerId: murphy.id,
      categoryId: toys.id,
      stock: 11
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
