import {
  GetItemInput,
  QueryCommandInput,
  CreateTableCommandInput
} from '@aws-sdk/client-dynamodb';

export class ComposedTable {
  tableName : string
  keys : string[]

  constructor(name : string, primaryKey : string, sortKey : string) {
    this.tableName = name
    this.keys = [
      primaryKey,
      sortKey
    ]
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
}