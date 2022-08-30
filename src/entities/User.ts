import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { UserItem, UsersTable } from '../resoucesList.js'

export class User {
  public primaryKey: string
  public sortKey: string
  public name: string
  public email: string
  public phone: string | null
  public wallet: string
  public docNumber: string | null

  constructor(
    userItem: any
  ){
    this.primaryKey = userItem.primaryKey
    this.sortKey = userItem.sortKey
    this.name = userItem.name
    this.email = userItem.email
    this.phone = userItem.phone
    this.wallet = userItem.wallet
    this.docNumber = userItem.docNumber
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
        phone: this.phone ? {"S": this.phone} : {"NULL": true},
        wallet: {"N": this.wallet},
        docNumber: this.docNumber ? {"N": this.docNumber} : {"NULL": true}
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
        phone: this.phone ? {"S": this.phone} : {"NULL": true},
        wallet: {"N": this.wallet},
        docNumber: this.docNumber ? {"N": this.docNumber} : {"NULL": true}
      }
    }
  }
}