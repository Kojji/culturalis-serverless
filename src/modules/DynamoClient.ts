import { 
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
  DeleteTableCommand,
  PutItemCommand,
  QueryCommand,
  GetItemCommand,
  GetItemInput,
  QueryCommandInput,
  PutItemCommandInput,
  CreateTableCommandInput,
  UpdateItemCommandInput,
  UpdateItemCommand
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const dbclient = new DynamoDBClient({ region: process.env.AWS_REGION });

async function getTable(TableName : string) {
  try {
    const data = await dbclient.send(new DescribeTableCommand({TableName}));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
}

async function createTable(tableParams: CreateTableCommandInput) {
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

async function putItem(item : PutItemCommandInput) {
  try {
    const data = await dbclient.send(new PutItemCommand(item));
    console.log("Success - item added", data);
  } catch (err) {
    console.log("Error", err);
  }
}

async function updateItem(item : UpdateItemCommandInput) {
  try {
    const data = await dbclient.send(new UpdateItemCommand(item));
    if(data) {
      console.log("Success - item updated");
      return true
    } else {
      return false
    }
  } catch (err) {
    console.log("Error", err);
  }
}

async function queryFromParams(params : QueryCommandInput) {
  try {
    const data = await dbclient.send(new QueryCommand(params));
    return {
      count: data.Count,
      items: data.Items
    }
  } catch (err) {
    console.log("Error", err);
  }
}

async function getItem(params : GetItemInput) {
  try {
    const data = await dbclient.send(new GetItemCommand(params));
    if(data.Item) {
      return unmarshall(data.Item)
    } else {
      return undefined
    }
  } catch (err) {
    console.log("Error", err);
  }
}

export {
  dbclient,
  getTable,
  createTable,
  deleteTable,
  putItem,
  queryFromParams,
  getItem,
  updateItem
};