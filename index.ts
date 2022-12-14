import 'dotenv/config';
import { runSetup } from './src/setup.js'
import { ProductsTable, UsersTable } from './src/resoucesList.js'
import { putItem, queryFromParams, getItem, updateItem } from './src/modules/DynamoClient.js'
import {
  AddressList,
  Collection,
  ComposedTable,
  Product,
  User
} from './src/entities/index.js'

try {
  if(process.argv[process.argv.length - 2] == 'setup') {
    await runSetup('setup', process.argv[process.argv.length - 1])
    throw new Error("Setup finished")
  } else if(process.argv[process.argv.length - 2] == 'clean') {
    await runSetup('clean', process.argv[process.argv.length - 1])
    throw new Error("Cleaning finished")
  }

  // const productsTable = new ComposedTable(ProductsTable.tableName, ProductsTable.keys, ProductsTable.globalIndexList)
  const usersTable = new ComposedTable(UsersTable.tableName, UsersTable.keys, UsersTable.globalIndexList)

  // const insertAddress = new AddressList({
  //   primaryKey: "USER#UUID123244",
  //   sortKey: "ADDRESS",
  //   addresses: []
  // })
  const gotAddress = await getItem(usersTable.getItemParams("USER#USER#UUID123244", "ADDRESSADDRESS"))

  const insertAddress = new AddressList(gotAddress)

  console.log(insertAddress)

  // const toBuild = insertAddress.removeAddress(0)

  // const toBuild = insertAddress.updateAddress(0,{
  //   name: "red endereço",
  //   recepient: "red's name",
  //   addressOne: "redad3",
  //   addressTwo: "red",
  //   city: "red3city",
  //   state: "red3QLD",
  //   zipCode: "02332-123",
  //   country: "redBR",
  //   default: true
  // })
  // const toBuild = insertAddress.toItem()

  // const collectionItem = await getItem(productsTable.getItemParams("COL#COLID4", "PROD#ID1"))
  // const collectionItems = await queryFromParams(productsTable.getQueryBySortParams("BLOG"))

  // const newUser = new User({
  //   primaryKey: "USER#UUID123244",
  //   sortKey: "INFO",
  //   name: "Nome de Usuário",
  //   email: "email@email.com",
  //   phone: "33399933",
  //   wallet: "21.99",
  //   docNumber: ''
  // })
  // const toBuild = newUser.buildItem()

  // const parsedProduct = new Product(collectionItem)
  // console.log(parsedProduct)


  // const toBuild = parsedProduct.updateColor(2, {
  //   active: true,
  //   images: ['yyy', 'outroUrl2'],
  //   files: ['urlFile3', 'file 1'],
  //   colorCode: '#1111',
  //   extraInfo: 'camisa: color, estampa: cor2',
  //   featured: true
  // })

  // const toBuild = parsedProduct.insertColor({
  //   active: false,
  //   images: ['url1', 'outroUrl2'],
  //   files: ['urlFile3', 'file 1'],
  //   colorCode: '#ffffff',
  //   extraInfo: 'camisa: color, estampa: cor2',
  //   featured: true
  // })


  // const toBuild = parsedProduct.updateDiscount({
  //   percentage: '10.40',
  //   discounted: '1.97',
  //   active: true,
  //   limitDate: '2022-09-24'
  // })

  // console.log(toBuild)

  // const updatedItem = await updateItem(toBuild)
  // console.log(updatedItem)

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
  
  // const newItem = putItem(toBuild)
  // console.log(newItem)

  // const collections = await queryByPrimary("Products", "COL#COLID2")


} catch(e) {
  console.log(e)
}