// list of resources naming conventions
// ************DynamoDB Tables*************
const ProductsTable = {
  tableName: "Products",
  primaryKey: ["primaryKey", "S"],
  sortKey: ["sortKey", "S"]
}

// ************DynamoDB Items*************
const CollectionItem = {
  tableName: "Products",
  itemName: "Collection",
  keySets: ["COL#", "PROD#", "BLOG"]
}

// *************************


export { 
  ProductsTable,
  CollectionItem,
}