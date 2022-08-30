import { PutItemCommandInput, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { UserAdressItem, UsersTable } from '../resoucesList.js'

interface Address {
  name: string
  recepient: string
  addressOne: string
  addressTwo: string | null
  city: string
  state: string
  zipCode: string
  country: string
  default: boolean
}

export class AddressList {
  public primaryKey: string
  public sortKey: string
  public addresses: Address[]

  constructor(
    userAddresses: any
  ){
    this.primaryKey = userAddresses.primaryKey
    this.sortKey = userAddresses.sortKey
    this.addresses = userAddresses.addresses
  }

  getTableKeys() {
    return {
      [UsersTable.keys[0].name]: {"S": `${this.primaryKey}`},
      [UsersTable.keys[1].name]: {"S": `${this.sortKey}`}
    };
  }

  getTableName() {
    return UserAdressItem.tableName
  }

  buildItem() : PutItemCommandInput {
    return {
      TableName: UserAdressItem.tableName,
      Item: {
        [UsersTable.keys[0].name]: {"S": `${UserAdressItem.keySets[0]}${this.primaryKey}`},
        [UsersTable.keys[1].name]: {"S": `${UserAdressItem.keySets[1]}${this.sortKey}`},
        addresses: {"L": this.addresses.map((address)=>{
          return { "M" : {
            name: {"S": address.name},
            recepient: {"S": address.recepient},
            addressOne: {"S": address.addressOne},
            addressTwo: address.addressTwo ? {"S": address.addressTwo} : {"NULL": true},
            city: {"S": address.city},
            state: {"S": address.state},
            zipCode: {"S": address.zipCode},
            country: {"S": address.country},
            default: {"BOOL": address.default}
          }}
        })}
      },
    }
  }

  toItem() {
    return {
      TableName: UserAdressItem.tableName,
      Item: {
        [UsersTable.keys[0].name]: {"S": `${this.primaryKey}`},
        [UsersTable.keys[1].name]: {"S": `${this.sortKey}`},
        addresses: {"L": this.addresses.map((address)=>{
          return { "M" : {
            name: {"S": address.name},
            recepient: {"S": address.recepient},
            addressOne: {"S": address.addressOne},
            addressTwo: address.addressTwo ? {"S": address.addressTwo} : {"NULL": true},
            city: {"S": address.city},
            state: {"S": address.state},
            zipCode: {"S": address.zipCode},
            country: {"S": address.country},
            default: {"BOOL": address.default}
          }}
        })}
      },
    }
  }

  insertAddress(updateInfo : Address) : UpdateItemCommandInput {
    const newAddress = {
      name: updateInfo.name,
      recepient: updateInfo.recepient,
      addressOne: updateInfo.addressOne,
      addressTwo: updateInfo.addressTwo,
      city: updateInfo.city,
      state: updateInfo.state,
      zipCode: updateInfo.zipCode,
      country: updateInfo.country,
      default: updateInfo.default
    }

    this.addresses.push(newAddress)

    return {
      TableName: UserAdressItem.tableName,
      Key: {
        [UsersTable.keys[0].name]: {"S": this.primaryKey},
        [UsersTable.keys[1].name]: {"S": this.sortKey}
      },
      UpdateExpression: "set #addresses = list_append(#addresses, :newAddress)",
      ExpressionAttributeNames: {"#addresses": "addresses"},
      ExpressionAttributeValues: {
        ":newAddress": { "L": [
          {"M": {
            name: {"S": updateInfo.name},
            recepient: {"S": updateInfo.recepient},
            addressOne: {"S": updateInfo.addressOne},
            addressTwo: updateInfo.addressTwo ? {"S": updateInfo.addressTwo} : {"NULL": true},
            city: {"S": updateInfo.city},
            state: {"S": updateInfo.state},
            zipCode: {"S": updateInfo.zipCode},
            country: {"S": updateInfo.country},
            default: {"BOOL": updateInfo.default}
          }}
        ]}
      },
      ReturnValues: "ALL_NEW"
    }
  }

  updateAddress(index : number, updateInfo : Address) : UpdateItemCommandInput {
    const updateAddress = {
      name: updateInfo.name,
      recepient: updateInfo.recepient,
      addressOne: updateInfo.addressOne,
      addressTwo: updateInfo.addressTwo,
      city: updateInfo.city,
      state: updateInfo.state,
      zipCode: updateInfo.zipCode,
      country: updateInfo.country,
      default: updateInfo.default
    }

    this.addresses[index] = updateAddress

    return {
      TableName: UserAdressItem.tableName,
      Key: {
        [UsersTable.keys[0].name]: {"S": this.primaryKey},
        [UsersTable.keys[1].name]: {"S": this.sortKey}
      },
      UpdateExpression: `set addresses[${index}] = :newColor`,
      ExpressionAttributeValues: {
        ":newColor": {
          "M": {
            name: {"S": updateInfo.name},
            recepient: {"S": updateInfo.recepient},
            addressOne: {"S": updateInfo.addressOne},
            addressTwo: updateInfo.addressTwo ? {"S": updateInfo.addressTwo} : {"NULL": true},
            city: {"S": updateInfo.city},
            state: {"S": updateInfo.state},
            zipCode: {"S": updateInfo.zipCode},
            country: {"S": updateInfo.country},
            default: {"BOOL": updateInfo.default}
          }
        }
      },
      ReturnValues: "ALL_NEW"
    }
  }

  removeAddress(index : number) {
    this.addresses.splice(index, 1)

    return {
      TableName: UserAdressItem.tableName,
      Key: {
        [UsersTable.keys[0].name]: {"S": this.primaryKey},
        [UsersTable.keys[1].name]: {"S": this.sortKey}
      },
      UpdateExpression: `remove addresses[${index}]`,
      ReturnValues: "ALL_NEW"
    }
  }
}