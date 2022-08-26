import { 
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
  DeleteTableCommand
} from '@aws-sdk/client-dynamodb';
import { PutCommand } from "@aws-sdk/lib-dynamodb";

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
    const data = await dbclient.send(new PutCommand(item));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err);
  }
}

export { dbclient, getTable, createTable, deleteTable, putItem };