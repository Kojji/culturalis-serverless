import 'dotenv/config';
import { putItem } from './src/modules/DynamoClient.js'
import { runSetup } from './src/setup.js'
import { Collection } from './src/entities/Collection.js'

try {
  if(process.argv[process.argv.length - 1] == 'setup') {
    await runSetup('setup')
    throw new Error("Setup finished")
  } else if(process.argv[process.argv.length - 1] == 'clean') {
    await runSetup('clean')
    throw new Error("Cleaning finished")
  }
  
  const collection = new Collection('COLID2', '', 'collection 1', 'this is the short des', 'complete description <b>which will be a blog post</b>', ['url 1', 'url 2'], 'user1', 10)
  
  // putItem(collection.buildItem())
  console.log(collection.buildItem())

} catch(e) {
  console.log(e)
}