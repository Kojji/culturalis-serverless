import { PutItemCommandInput, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
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
  percentage: string
  discounted: string
  active: boolean
  limitDate: string
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
      percentage: productItem.discount.percentage,
      discounted: productItem.discount.discounted,
      active: productItem.discount.active,
      limitDate: productItem.discount.limitDate
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
          percentage: {"N": this.discount.percentage},
          discounted: {"N": this.discount.discounted},
          active: {"BOOL": this.discount.active},
          limitDate: this.discount.limitDate ? {"S": this.discount.limitDate} : {"S": ""}
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
          percentage: {"N": this.discount.percentage},
          discounted: {"N": this.discount.discounted},
          active: {"BOOL": this.discount.active},
          limitDate: {"S": this.discount.limitDate}
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

  updateDiscount(updateInfo : discount) : UpdateItemCommandInput {
    this.discount = {
      percentage: updateInfo.percentage,
      discounted: updateInfo.discounted,
      active: updateInfo.active,
      limitDate: updateInfo.limitDate
    }

    return {
      TableName: ProductItem.tableName,
      Key: {
        primaryKey: {"S": this.primaryKey},
        sortKey: {"S": this.sortKey}
      },
      UpdateExpression: "set discount.percentage = :p, discount.discounted = :v, discount.active = :a, discount.limitDate = :d",
      ExpressionAttributeValues: {
        ":p": {"N": this.discount.percentage},
        ":v": {"N": this.discount.discounted},
        ":a": {"BOOL": this.discount.active},
        ":d": {"S": this.discount.limitDate}
      },
      ReturnValues: "ALL_NEW"
    }
  }

  // insert color
  // get item
}