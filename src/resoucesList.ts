// list of resources naming conventions
// ************DynamoDB Tables*************
const ProductsTable = {
  tableName: "Products",
  primaryKey: "primaryKey",
  sortKey: "sortKey",
  globalIndexList: [
    {IndexName: "blog-list", keys:["sortKey"], NonKeyAttributes: ["shortDescription", "title", "images"]}
  ]
}
// const OrdersTable = {
//   tableName: "Orders",
//   primaryKey: "primaryKey",
//   sortKey: "sortKey",
//   // include other keys
//   globalIndexList: [
//     {IndexName: "user-list", keys:["sortKey", "primaryKey"], NonKeyAttributes: ["name", "email"]}
//   ]
// }

// ************DynamoDB Items*************
const CollectionItem = {
  tableName: "Products",
  itemName: "Collection",
  keySets: ["COL#", "PROD#", "BLOG"]
}

// *************************


export { 
  ProductsTable,
  // OrdersTable,
  CollectionItem,
}