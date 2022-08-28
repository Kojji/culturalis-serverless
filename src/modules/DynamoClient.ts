import { 
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
  DeleteTableCommand,
  PutItemCommand,
  QueryCommand
} from '@aws-sdk/client-dynamodb';

const dbclient = new DynamoDBClient({ region: process.env.AWS_REGION });

async function getTable(TableName : string) {
  try {
    const data = await dbclient.send(new DescribeTableCommand({TableName}));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
}

async function createTable(tableParams: any) {
  try {
    const data = await dbclient.send(new CreateTableCommand(tableParams));
    console.log("Table Created", tableParams.TableName);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
}

async function deleteTable(TableName : string) {
  try {
    await dbclient.send(new DeleteTableCommand({TableName}));
    console.log("Table Deleted", TableName);
    return true
  } catch (err) {
    console.log("Error", err);
    return false
  }
}

async function putItem(item : any) {
  try {
    const data = await dbclient.send(new PutItemCommand(item));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err);
  }
}

async function queryByPrimary(tableName: string, primaryKey: string) {
  try {
    const params = {
      KeyConditionExpression: "primaryKey = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: primaryKey },
      },
      TableName: tableName,
    };
    const data = await dbclient.send(new QueryCommand(params));
    return data
  } catch (err) {
    console.log("Error", err);
  }
}

export { dbclient, getTable, createTable, deleteTable, putItem, queryByPrimary };