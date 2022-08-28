import { getTable, createTable, deleteTable } from './modules/DynamoClient.js'
import { ComposedTable } from './entities/ComposedTable.js'
import { ProductsTable } from './resoucesList.js'

// create tables
// create incognito pool
// create s3 buckets for image upload 
// create lambda functions
// setup elasticache
// setup api gateway

async function runSetup(type: string) {
  const creation = type === 'setup' ? true : false
  const deletion = type === 'clean' ? true : false

  const productsTable = new ComposedTable(ProductsTable.tableName, ProductsTable.primaryKey, ProductsTable.sortKey)
  const retrieved = await getTable(productsTable.getName())
  if(!retrieved && creation) {
    console.log(await createTable(productsTable.getTableParams()))
  } else if(deletion) {
    console.log(await deleteTable(productsTable.getName()))
  }
  

  
  return true
}

export { runSetup }