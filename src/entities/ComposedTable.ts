import {
  GetItemInput,
  QueryCommandInput,
  CreateTableCommandInput
} from '@aws-sdk/client-dynamodb';

interface secIndex {
  IndexName: string
  keys: string[]
  NonKeyAttributes: string[]
}
export class ComposedTable {
  tableName : string
  keys : string[]
  secIndexKeys: secIndex[]

  constructor(name : string, primaryKey : string, sortKey : string, globalIndexKeys: secIndex[]) {
    this.tableName = name
    this.keys = [
      primaryKey,
      sortKey
    ]
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
      AttributeDefinitions: [
        {
          AttributeName: this.keys[0],
          AttributeType: "S",
        },
        {
          AttributeName: this.keys[1],
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: this.keys[0],
          KeyType: "HASH",
        },
        {
          AttributeName: this.keys[1],
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
        [this.keys[0]]: {"S": primaryValue}, 
        [this.keys[1]]: {"S": sortValue}
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