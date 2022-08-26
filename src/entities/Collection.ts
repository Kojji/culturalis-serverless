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

  toItem(TableName : string) {
    return {
      TableName,
      Item: {
        primaryKey: this.primaryKey,
        sortKey: this.sortKey,
        title: this.title,
        shortDescription: this.shortDescription,
        description: this.description,
        images: this.images,
        UserKey: this.UserKey,
        sellPercent: this.sellPercent
      },
    }
  }
}