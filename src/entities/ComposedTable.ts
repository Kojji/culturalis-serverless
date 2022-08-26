interface Key {
  key: string
  type: string
}

export class ComposedTable {
  tableName : string
  keys : Key[]

  constructor(name : string, primaryKey : string[], sortKey : string[]) {
    this.tableName = name
    this.keys = [
      {
        key: primaryKey[0],
        type: primaryKey[1]
      },
      {
        key: sortKey[0],
        type: sortKey[1]
      }
    ]
  }

  getName() {
    return this.tableName
  }

  getKeys() {
    return this.keys
  }

  getTableParams() {
    return {
      AttributeDefinitions: [
        {
          AttributeName: this.keys[0].key,
          AttributeType: this.keys[0].type,
        },
        {
          AttributeName: this.keys[1].key,
          AttributeType: this.keys[1].type,
        },
      ],
      KeySchema: [
        {
          AttributeName: this.keys[0].key,
          KeyType: "HASH",
        },
        {
          AttributeName: this.keys[1].key,
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
}