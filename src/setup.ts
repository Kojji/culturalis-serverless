import { getTable, createTable, deleteTable } from './modules/DynamoClient.js'
import { ComposedTable } from './entities/ComposedTable.js'
import { ProductsTable, UsersTable } from './resoucesList.js'

// create tables
// create incognito pool
// create s3 buckets for image upload 
// create lambda functions
// setup elasticache
// setup api gateway

async function runSetup(type: string) {
  const creation = type === 'setup' ? true : false
  const deletion = type === 'clean' ? true : false

  const productsTable = new ComposedTable(ProductsTable.tableName, ProductsTable.keys, ProductsTable.globalIndexList)
  const checkProductsTableExists = await getTable(productsTable.getName())
  if(!checkProductsTableExists && creation) {
    console.log(await createTable(productsTable.getTableParams()))
  } else if(checkProductsTableExists && deletion) {
    console.log(await deleteTable(productsTable.getName()))
  }

  const usersTable = new ComposedTable(UsersTable.tableName, UsersTable.keys, UsersTable.globalIndexList)
  const checkUsersTableExists = await getTable(usersTable.getName())
  if(!checkUsersTableExists && creation) {
    console.log(usersTable.getTableParams().GlobalSecondaryIndexes)
    console.log(await createTable(usersTable.getTableParams()))
  } else if(checkUsersTableExists && deletion) {
    console.log(await deleteTable(usersTable.getName()))
  }
  

  
  return true
}

export { runSetup }