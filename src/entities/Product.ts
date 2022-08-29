import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { ProductItem } from '../resoucesList.js'

interface productPerColor {
  active: boolean
  images: string[]
  files: string[]
  colorCode: string
  extraInfo: string
  featured: boolean
}

interface discount {
  percent: string
  value: string
  active: boolean
  date?: string
}

export class Product {
  public primaryKey: string
  public sortKey: string
  public type: string
  public title: string
  public description: string
  public price: string
  public colors: productPerColor[]
  public discount: discount
  public sizes: string[]

  constructor(
    productItem: any
  ){
    this.primaryKey = productItem.primaryKey
    this.sortKey = productItem.sortKey
    this.title = productItem.title
    this.type = productItem.type
    this.description = productItem.description
    this.colors = productItem.colors.map((color : any)=>{
      return {
        active: color.active,
        images: color.images,
        files: color.files,
        colorCode: color.colorCode,
        extraInfo: color.extraInfo,
        featured: color.featured
      }
    })
    this.price = productItem.price
    this.sizes = productItem.sizes
    this.discount = {
      percent: productItem.discount.percent,
      value: productItem.discount.value,
      active: productItem.discount.active,
      date: productItem.discount.date
    }
  }

  getTableKeys() {
    return {
      primaryKey: {"S": `${ProductItem.keySets[0]}${this.primaryKey}`},
      sortKey: {"S": `${ProductItem.keySets[1]}${this.sortKey}`}
    };
  }

  getTableName() {
    return ProductItem.tableName
  }

  buildItem() : PutItemCommandInput {
    return {
      TableName: ProductItem.tableName,
      Item: {
        primaryKey: {"S": `${ProductItem.keySets[0]}${this.primaryKey}`},
        sortKey: {"S": `${ProductItem.keySets[1]}${this.sortKey}`},
        title: {"S": this.title},
        type: {"S": this.type},
        description: {"S": this.description},
        price: {"N": this.price},
        sizes: {"L": this.sizes.map((size)=>{return {"S": size}})},
        discount: {"M": {
          percent: {"N": this.discount.percent},
          value: {"N": this.discount.value},
          active: {"BOOL": this.discount.active},
          date: this.discount.date ? {"S": this.discount.date} : {"S": ""}
        }},
        colors: {"L": this.colors.map((color)=>{
          return {
            "M": {
              active: {"BOOL": color.active},
              images: {"L": color.images.map((image)=>{return {"S": image}})},
              files: {"L": color.files.map((file)=>{return {"S": file}})},
              colorCode: {"S": color.colorCode},
              extraInfo: {"S": color.extraInfo},
              featured: {"BOOL": color.featured}
            }
          }
        })}
      },
    }
  }

  toItem() {
    return {
      TableName: ProductItem.tableName,
      Item: {
        primaryKey: {"S": this.primaryKey},
        sortKey: {"S": this.sortKey},
        title: {"S": this.title},
        type: {"S": this.type},
        description: {"S": this.description},
        price: {"N": this.price},
        sizes: {"L": this.sizes.map((size)=>{return {"S": size}})},
        discount: {"M": {
          percent: {"N": this.discount.percent},
          value: {"N": this.discount.value},
          active: {"BOOL": this.discount.active},
          date: {"S": this.discount.date}
        }},
        colors: {"L": this.colors.map((color)=>{
          return {
            "M": {
              active: {"BOOL": color.active},
              images: {"L": color.images.map((image)=>{return {"S": image}})},
              files: {"L": color.files.map((file)=>{return {"S": file}})},
              colorCode: {"S": color.colorCode},
              extraInfo: {"S": color.extraInfo},
              featured: {"BOOL": color.featured}
            }
          }
        })}
      },
    }
  }

  // insert color
  // insert discount
  // get item
}