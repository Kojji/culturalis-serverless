// list of resources naming conventions
// ************DynamoDB Tables*************
const ProductsTable = {
  tableName: "Products",
  keys:[
    {name: "primaryKey", type: "S"},
    {name: "sortKey", type: "S"}
  ],
  globalIndexList: [
    {IndexName: "blog-list", keys:["sortKey"], NonKeyAttributes: ["shortDescription", "title", "images"]}
  ]
}
// const OrdersTable = {
//   tableName: "Orders",
//   keys:[
//     {name: "primaryKey", type: "S"},
//     {name: "sortKey", type: "S"},
//     {name: "userKey", type: "S"}
//   ],
//   globalIndexList: [
//     {IndexName: "user-list", keys:["sortKey", "userKey"], NonKeyAttributes: ["name", "email"]}
//   ]
// }

// ************DynamoDB Items*************
const CollectionItem = {
  tableName: "Products",
  itemName: "Collection",
  keySets: ["COL#", "BLOG"]
}

const ProductItem = {
  tableName: "Products",
  itemName: "Production",
  keySets: ["COL#", "PROD#"]
}

// *************************


export { 
  ProductsTable,
  // OrdersTable,
  CollectionItem,
  ProductItem
}