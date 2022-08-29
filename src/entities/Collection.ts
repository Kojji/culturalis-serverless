import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { CollectionItem } from '../resoucesList.js'

export class Collection {
  public primaryKey: string
  public sortKey: string
  public title: string
  public shortDescription: string
  public description: string
  public images: string[]
  public UserKey: string
  public sellPercent: number

  constructor(
    collectionItem: any
  ){
    this.primaryKey = collectionItem.primaryKey
    this.sortKey = collectionItem.sortKey
    this.title = collectionItem.title
    this.shortDescription = collectionItem.shortDescription
    this.description = collectionItem.description
    this.images = collectionItem.images
    this.UserKey = collectionItem.UserKey
    this.sellPercent = collectionItem.sellPercent
  }

  getTableKeys() {
    return {
      primaryKey: {"S": `${CollectionItem.keySets[0]}${this.primaryKey}`},
      sortKey: {"S": `${CollectionItem.keySets[1]}${this.sortKey}`}
    };
  }

  getTableName() {
    return CollectionItem.tableName
  }

  buildItem() : PutItemCommandInput {
    return {
      TableName: CollectionItem.tableName,
      Item: {
        primaryKey: {"S": `${CollectionItem.keySets[0]}${this.primaryKey}`},
        sortKey: {"S": `${CollectionItem.keySets[1]}${this.sortKey}`},
        title: {"S": this.title},
        shortDescription: {"S": this.shortDescription},
        description: {"S": this.description},
        images: {"L": this.images.map((image)=>{return {"S": image}})},
        UserKey: {"S": this.UserKey},
        sellPercent: {"N": `${this.sellPercent}`}
      },
    }
  }

  toItem() {
    return {
      TableName: CollectionItem.tableName,
      Item: {
        primaryKey: {"S": this.primaryKey},
        sortKey: {"S": this.sortKey},
        title: {"S": this.title},
        shortDescription: {"S": this.shortDescription},
        description: {"S": this.description},
        images: {"L": this.images.map((image)=>{return {"S": image}})},
        UserKey: {"S": this.UserKey},
        sellPercent: {"N": `${this.sellPercent}`}
      },
    }
  }
}