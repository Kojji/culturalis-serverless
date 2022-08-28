import 'dotenv/config';
import { runSetup } from './src/setup.js'
import { Collection } from './src/entities/Collection.js'

try {
  if(process.argv[process.argv.length - 1] == 'setup') {
    await runSetup()
    throw new Error("Setup finished")
  }
  
  const collection = new Collection('COLID1', 'BLOG', 'collection 1', 'this is the short des', 'complete description <b>which will be a blog post</b>', ['url 1', 'url 2'], 'user1', 10)
  
  // putItem(collection.toItem(ProductsTable.getName()))

} catch(e) {
  console.log(e)
}