import { CollectionItem } from '../resoucesList.js'

export class Collection {
  constructor(
    public primaryKey: string,
    public sortKey: string,
    public title: string,
    public shortDescription: string,
    public description: string,
    public images: string[],
    public UserKey: string,
    public sellPercent: number
  ){}

  getTableKeys() {
    return CollectionItem.keySets;
  }

  getTableName() {
    return CollectionItem.tableName
  }

  buildItem() {
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
        images: {"SS": this.images},
        UserKey: {"S": this.UserKey},
        sellPercent: {"N": `${this.sellPercent}`}
      },
    }
  }
}