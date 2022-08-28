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

  toItem(TableName : string) {
    return {
      TableName,
      Item: {
        primaryKey: {"S": this.primaryKey},
        sortKey: {"S": this.sortKey},
        title: {"S": this.title},
        shortDescription: {"S": this.shortDescription},
        description: {"S": this.description},
        images: {"L": this.images},
        UserKey: {"S": this.UserKey},
        sellPercent: {"S": this.sellPercent}
      },
    }
  }
}