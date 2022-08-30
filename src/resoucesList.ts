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
  ],
  classType: "standard"
}

const UsersTable = {
  tableName: "Users",
  keys:[
    {name: "primaryKey", type: "S"},
    {name: "sortKey", type: "S"}
  ],
  globalIndexList: [
    {IndexName: "cart-list", keys:["sortKey"], NonKeyAttributes: ["cartItems"]}
  ],
  classType: "standard"
}

const OrdersTable = {
  tableName: "Orders",
  keys:[
    {name: "primaryKey", type: "S"},
    {name: "sortKey", type: "S"}
  ],
  globalIndexList: [],
  classType: "infrequent"
}

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

const UserItem = {
  tableName: "Users",
  itemName: "User",
  keySets: ["USER#", "INFO"]
}

const UserAdressItem = {
  tableName: "Users",
  itemName: "User",
  keySets: ["USER#", "ADDRESS"]
}

const CartItem = {
  tableName: "Users",
  itemName: "Cart",
  keySets: ["USER#", "CART"]
}

const OrderItem = {
  tableName: "OrdersTable",
  itemName: "Order",
  keySets: ["USER#", "ORD#"] // sortKey = date+number
}

// *************************


export { 
  ProductsTable,
  UsersTable,
  OrdersTable,
  CollectionItem,
  ProductItem,
  UserAdressItem,
  UserItem,
  CartItem,
  OrderItem
}