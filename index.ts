import 'dotenv/config';
import { putItem, queryFromParams, getItem, updateItem } from './src/modules/DynamoClient.js'
import { runSetup } from './src/setup.js'
import { Collection } from './src/entities/Collection.js'
import { Product } from './src/entities/Product.js'
import { ComposedTable } from './src/entities/ComposedTable.js'
import { ProductsTable } from './src/resoucesList.js'

try {
  if(process.argv[process.argv.length - 1] == 'setup') {
    await runSetup('setup')
    throw new Error("Setup finished")
  } else if(process.argv[process.argv.length - 1] == 'clean') {
    await runSetup('clean')
    throw new Error("Cleaning finished")
  }

  const productsTable = new ComposedTable(ProductsTable.tableName, ProductsTable.keys, ProductsTable.globalIndexList)

  const collectionItem = await getItem(productsTable.getItemParams("COL#COLID4", "PROD#ID1"))
  // const collectionItems = await queryFromParams(productsTable.getQueryBySortParams("BLOG"))

  const parsedProduct = new Product(collectionItem)
  // console.log(parsedProduct)

  const toBuild = parsedProduct.insertColor({
    active: true,
    images: ['url', 'outroUrl'],
    files: ['urlFile', 'file 1'],
    colorCode: '#22332',
    extraInfo: 'camisa: color, estampa: cor2',
    featured: false
  })

  // const updated = parsedProduct.updateDiscount({
  //   percentage: '10.40',
  //   discounted: '1.97',
  //   active: true,
  //   limitDate: '2022-09-24'
  // })

  const updatedItem = await updateItem(toBuild)

  console.log(updatedItem)
  // const newItem = new Collection(collectionItem)


  // const newProduct = new Product({
  //   primaryKey: "COLID4",
  //   sortKey: "ID1",
  //   title:"Produto 1",
  //   type: "Camiseta",
  //   description: "description",
  //   price: "12.99",
  //   sizes: ["PP", "M"],
  //   colors: [],
  //   discount: {
  //     percentage: '0.00',
  //     discounted: '0.00',
  //     active: false,
  //     limitDate: ''
  //   }
  // })
  // const collection = new Collection('COLID2', '', 'collection 1', 'this is the short des', 'complete description <b>which will be a blog post</b>', ['url 1', 'url 2'], 'user1', 10, ['tag1'])
  
  // const newItem = putItem(newProduct.buildItem())
  // console.log(newItem)

  // const collections = await queryByPrimary("Products", "COL#COLID2")


} catch(e) {
  console.log(e)
}