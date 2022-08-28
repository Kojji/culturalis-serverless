import { getTable, createTable, deleteTable } from './modules/DynamoClient.js'
import { ComposedTable } from './entities/ComposedTable.js'
import { ProductsTable } from './resoucesList.js'

// create tables
// create incognito pool
// create s3 buckets for image upload 
// create lambda functions
// setup elasticache
// setup api gateway

async function runSetup() {
  const productsTable = new ComposedTable(ProductsTable.tableName, ProductsTable.primaryKey, ProductsTable.sortKey)
  const tableCreation = async (doCreate : boolean, doDelete : boolean) => {
    const retrieved = await getTable(productsTable.getName())
    if(!retrieved && doCreate) {
      return await createTable(productsTable.getTableParams())
    } else if(doDelete) {
      return await deleteTable(productsTable.getName())
    }
  }
  
  console.log(tableCreation(false, false))
  return true
}

export { runSetup }