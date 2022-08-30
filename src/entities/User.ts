import { PutItemCommandInput, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { UserItem, UsersTable } from '../resoucesList.js'

export class Product {
  public primaryKey: string
  public sortKey: string
  public name: string
  public email: string
  public phone: string
  public wallet: string

  constructor(
    userItem: any
  ){
    this.primaryKey = userItem.primaryKey
    this.sortKey = userItem.sortKey
    this.name = userItem.name
    this.email = userItem.email
    this.phone = userItem.phone
    this.wallet = userItem.wallet
  }

  getTableKeys() {
    return {
      [UsersTable.keys[0].name]: {"S": `${this.primaryKey}`},
      [UsersTable.keys[1].name]: {"S": `${this.sortKey}`}
    };
  }

  getTableName() {
    return UserItem.tableName
  }

  buildItem() : PutItemCommandInput {
    return {
      TableName: UserItem.tableName,
      Item: {
        [UsersTable.keys[0].name]: {"S": `${UserItem.keySets[0]}${this.primaryKey}`},
        [UsersTable.keys[1].name]: {"S": `${UserItem.keySets[1]}${this.sortKey}`},
        name: {"S": this.name},
        email: {"S": this.email},
        phone: {"S": this.phone},
        wallet: {"N": this.wallet}
      },
    }
  }

  toItem() {
    return {
      TableName: UserItem.tableName,
      Item: {
        [UsersTable.keys[0].name]: {"S": `${this.primaryKey}`},
        [UsersTable.keys[1].name]: {"S": `${this.sortKey}`},
        name: {"S": this.name},
        email: {"S": this.email},
        phone: {"S": this.phone},
        wallet: {"N": this.wallet}
      },
    }
  }
}