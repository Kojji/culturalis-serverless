import 'dotenv/config';
import { putItem, queryByPrimary, getItem } from './src/modules/DynamoClient.js'
import { runSetup } from './src/setup.js'
import { Collection } from './src/entities/Collection.js'
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

  const productsTable = new ComposedTable(ProductsTable.tableName, ProductsTable.primaryKey, ProductsTable.sortKey)

  // const collectionItem = await getItem(productsTable.getItemParams("COL#COLID2", "BLOG"))
  const collectionItems = await queryByPrimary(productsTable.getQueryByPrimaryParams("COL#COLID2"))
  console.log(collectionItems)

  // const collection = new Collection('COLID2', '', 'collection 1', 'this is the short des', 'complete description <b>which will be a blog post</b>', ['url 1', 'url 2'], 'user1', 10)
  
  // putItem(collection.buildItem())
  // const collections = await queryByPrimary("Products", "COL#COLID2")

  // console.log(collections.Items)

} catch(e) {
  console.log(e)
}