import 'dotenv/config';
import { getTable, createTable, deleteTable, putItem } from './src/modules/DynamoClient.js'
import { ComposedTable } from './src/entities/ComposedTable.js'
import { Collection } from './src/entities/Collection.js'

const ProductsTable = new ComposedTable("Products", ["primaryKey", "S"], ["sortKey", "S"])
const tableCreation = async (doCreate : boolean, doDelete : boolean) => {
  const retrieved = await getTable(ProductsTable.getName())
  if(!retrieved && doCreate) {
    const createdTable = await createTable(ProductsTable.getTableParams())
    throw new Error(`Finalizado por criação ${ createdTable ? "sucedida" : "falha" } de tabela.`) // finalizing due to async creation of table by dynamodb
  } else if(doDelete) {
    const deletedTable = await deleteTable(ProductsTable.getName())
    throw new Error(`Finalizado por remoção ${ deletedTable ? "sucedida" : "falha" } de tabela.`) // finalizing due to async deletion of table by dynamodb
  }
}

tableCreation(false, false)

console.log(ProductsTable.getName())
const collection = new Collection('COLID1', 'BLOG', 'collection 1', 'this is the short des', 'complete description <b>which will be a blog post</b>', ['url 1', 'url 2'], 'user1', 10)

// putItem(collection.toItem(ProductsTable.getName()))