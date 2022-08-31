import { PutItemCommandInput, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { CartItem, UsersTable } from '../resoucesList.js'

interface reducedProduct{
  prodPrimary: string
  prodSort: string
  colorId: string
  size: string
  quantity: string
}

export class CartList {
  public primaryKey: string
  public sortKey: string
  public cart: reducedProduct[]
  public lastUpdated: string

  constructor(
    userAddresses: any
  ){
    this.primaryKey = userAddresses.primaryKey
    this.sortKey = userAddresses.sortKey
    this.cart = userAddresses.addresses
    this.lastUpdated = userAddresses.lastUpdated
  }

  getTableKeys() {
    return {
      [UsersTable.keys[0].name]: {"S": `${this.primaryKey}`},
      [UsersTable.keys[1].name]: {"S": `${this.sortKey}`}
    };
  }

  getTableName() {
    return CartItem.tableName
  }

  buildItem() : PutItemCommandInput {
    return {
      TableName: CartItem.tableName,
      Item: {
        [UsersTable.keys[0].name]: {"S": `${CartItem.keySets[0]}${this.primaryKey}`},
        [UsersTable.keys[1].name]: {"S": `${CartItem.keySets[1]}${this.sortKey}`},
        cart: {"L": this.cart.map((cartItem)=>{
          return { "M" : {
            prodPrimary: {"S": cartItem.prodPrimary},
            prodSort: {"S": cartItem.prodSort},
            colorId: {"S": cartItem.colorId},
            size: {"S": cartItem.size},
            quantity: {"N": cartItem.quantity}
          }}
        })},
        lastUpdated: {"S": this.lastUpdated}
      },
    }
  }

  toItem() {
    return {
      TableName: CartItem.tableName,
      Item: {
        [UsersTable.keys[0].name]: {"S": `${this.primaryKey}`},
        [UsersTable.keys[1].name]: {"S": `${this.sortKey}`},
        cart: {"L": this.cart.map((cartItem)=>{
          return { "M" : {
            prodPrimary: {"S": cartItem.prodPrimary},
            prodSort: {"S": cartItem.prodSort},
            colorId: {"S": cartItem.colorId},
            size: {"S": cartItem.size},
            quantity: {"N": cartItem.quantity}
          }}
        })},
        lastUpdated: {"S": this.lastUpdated}
      },
    }
  }

  insertCartItem(updateInfo : reducedProduct) : UpdateItemCommandInput {
    const newItem = {
      prodPrimary: updateInfo.prodPrimary,
      prodSort: updateInfo.prodSort,
      colorId: updateInfo.colorId,
      size: updateInfo.size,
      quantity: updateInfo.quantity
    }

    this.cart.push(newItem)

    return {
      TableName: CartItem.tableName,
      Key: {
        [UsersTable.keys[0].name]: {"S": this.primaryKey},
        [UsersTable.keys[1].name]: {"S": this.sortKey}
      },
      UpdateExpression: "set #cart = list_append(#cart, :newCartItem)",
      ExpressionAttributeNames: {"#cart": "cart"},
      ExpressionAttributeValues: {
        ":newCartItem": { "L": [
          {"M": {
            prodPrimary: {"S": updateInfo.prodPrimary},
            prodSort: {"S": updateInfo.prodSort},
            colorId: {"S": updateInfo.colorId},
            size: {"S": updateInfo.size},
            quantity: {"N": updateInfo.quantity}
          }}
        ]}
      },
      ReturnValues: "ALL_NEW"
    }
  }

  updateCartItem(index : number, updateInfo : reducedProduct) : UpdateItemCommandInput {
    const updateCartItem = {
      prodPrimary: updateInfo.prodPrimary,
      prodSort: updateInfo.prodSort,
      colorId: updateInfo.colorId,
      size: updateInfo.size,
      quantity: updateInfo.quantity
    }

    this.cart[index] = updateCartItem

    return {
      TableName: CartItem.tableName,
      Key: {
        [UsersTable.keys[0].name]: {"S": this.primaryKey},
        [UsersTable.keys[1].name]: {"S": this.sortKey}
      },
      UpdateExpression: `set addresses[${index}] = :newColor`,
      ExpressionAttributeValues: {
        ":newColor": {
          "M": {
            prodPrimary: {"S": updateInfo.prodPrimary},
            prodSort: {"S": updateInfo.prodSort},
            colorId: {"S": updateInfo.colorId},
            size: {"S": updateInfo.size},
            quantity: {"N": updateInfo.quantity}
          }
        }
      },
      ReturnValues: "ALL_NEW"
    }
  }

  removeCartItem(index : number) {
    this.cart.splice(index, 1)

    return {
      TableName: CartItem.tableName,
      Key: {
        [UsersTable.keys[0].name]: {"S": this.primaryKey},
        [UsersTable.keys[1].name]: {"S": this.sortKey}
      },
      UpdateExpression: `remove cart[${index}]`,
      ReturnValues: "ALL_NEW"
    }
  }
}