import {
  GetItemInput,
  QueryCommandInput,
  CreateTableCommandInput,
  AttributeDefinition
} from '@aws-sdk/client-dynamodb';

interface key {
  name: string
  type: string
}
interface secIndex {
  IndexName: string
  keys: string[]
  NonKeyAttributes: string[]
}
export class ComposedTable {
  tableName : string
  keys : key[]
  secIndexKeys: secIndex[]

  constructor(name : string, keys: key[], globalIndexKeys: secIndex[]) {
    this.tableName = name
    this.keys = keys
    this.secIndexKeys = globalIndexKeys
  }

  getName() {
    return this.tableName
  }

  getKeys() {
    return this.keys
  }

  getTableParams() : CreateTableCommandInput {
    return {
      AttributeDefinitions: this.keys.map((item) : AttributeDefinition =>{
        return {
          AttributeName: item.name,
          AttributeType: item.type
        }
      }),
      KeySchema: [
        {
          AttributeName: this.keys[0].name,
          KeyType: "HASH",
        },
        {
          AttributeName: this.keys[1].name,
          KeyType: "RANGE",
        },
      ],
      GlobalSecondaryIndexes: this.secIndexKeys.length === 0 ? undefined : this.secIndexKeys.map((item)=>{
        return {
          IndexName: item.IndexName,
          KeySchema: item.keys.length > 0 ? 
            [{
              AttributeName: item.keys[0],
              KeyType: "HASH"
            },
             {
              AttributeName: item.keys[1],
              KeyType: "RANGE"
            }] : [{
              AttributeName: item.keys[0],
              KeyType: "HASH"
            }],
          Projection: {
            ProjectionType: "INCLUDE",
            NonKeyAttributes: item.NonKeyAttributes
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          }
        }
      }),
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: this.tableName,
      StreamSpecification: {
        StreamEnabled: false,
      }
    }
  }

  getItemParams(primaryValue: string, sortValue: string) : GetItemInput {
    return {
      TableName: this.tableName,
      Key: {
        [this.keys[0].name]: {"S": primaryValue}, 
        [this.keys[1].name]: {"S": sortValue}
      }
    }
  }

  getQueryByPrimaryParams(primaryValue: string) : QueryCommandInput {
    return {
      KeyConditionExpression: `${this.keys[0]} = :pk`,
      ExpressionAttributeValues: {
        ":pk": { "S": primaryValue },
      },
      TableName: this.tableName,
    };
  }

  getQueryBySortParams(sortValue: string) : QueryCommandInput {
    return {
      KeyConditionExpression: `${this.keys[1]} = :sk`,
      IndexName: this.secIndexKeys[0].IndexName,
      ExpressionAttributeValues: {
        ":sk": { "S": sortValue },
      },
      TableName: this.tableName,
    };
  }
}