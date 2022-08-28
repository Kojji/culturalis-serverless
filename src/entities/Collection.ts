import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { CollectionItem, ProductsTable } from '../resoucesList.js'

export class Collection {
  constructor(
    public primaryKey: string,
    public sortKey: string,
    public title: string,
    public shortDescription: string,
    public description: string,
    public images: string[],
    public UserKey: string,
    public sellPercent: number,
    public tags: string[]
  ){}

  getTableKeys() {
    return {
      primaryKey: {"S": `${CollectionItem.keySets[0]}${this.primaryKey}`},
      sortKey: {"S": `${CollectionItem.keySets[2]}${this.sortKey}`}
    };
  }

  getTableKeyNames() {
    return {
      primaryKey: ["primaryKey", "S"],
      sortKey: ["sortKey", "S"]
    }
  }

  getTableName() {
    return CollectionItem.tableName
  }

  buildItem() : PutItemCommandInput {
    return {
      TableName: CollectionItem.tableName,
      Item: {
        primaryKey: {"S": `${CollectionItem.keySets[0]}${this.primaryKey}`},
        sortKey: {"S": `${CollectionItem.keySets[2]}${this.sortKey}`},
        title: {"S": this.title},
        shortDescription: {"S": this.shortDescription},
        description: {"S": this.description},
        images: {"SS": this.images},
        UserKey: {"S": this.UserKey},
        sellPercent: {"N": `${this.sellPercent}`},
        tags: {"SS": this.tags}
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
        images: {"SS": this.images},
        UserKey: {"S": this.UserKey},
        sellPercent: {"N": `${this.sellPercent}`},
        tags: {"SS": this.tags}
      },
    }
  }
}