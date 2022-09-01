import { getTable, createTable, deleteTable } from './modules/DynamoClient.js'
import { ComposedTable } from './entities/index.js'
import { ProductsTable, UsersTable, RestAPIInstance } from './resoucesList.js'
import { setupRESTAPI, getAPI, cleanRESTAPI, getResources } from './modules/APIGateway.js'

// create tables
// create incognito pool
// create s3 buckets for image upload 
// create lambda functions
// setup elasticache
// setup api gateway

async function runSetup(type: string, option: string) {
  const creation = type === 'setup' ? true : false
  const deletion = type === 'clean' ? true : false

  if(option === 'dynamoDB' || option === 'all') {
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
  }
  
  if(option === 'APIGateway' || option === 'all') {
    if(RestAPIInstance.id) {
      const APIExists = await getAPI(RestAPIInstance.id)
      if(!APIExists && creation) {
        const restAPIId = await setupRESTAPI(RestAPIInstance.name)
      } else if(APIExists && deletion) {
        cleanRESTAPI()
      }
    } else if(creation) {
      const restAPIId = await setupRESTAPI(RestAPIInstance.name)
    }
  
    getResources(RestAPIInstance.id)
  }


  return true
}

export { runSetup }