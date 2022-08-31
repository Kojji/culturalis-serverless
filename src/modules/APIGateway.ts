import { 
  APIGatewayClient,
  CreateApiKeyCommand,
  CreateRestApiCommand,
  GetRestApiCommand
} from "@aws-sdk/client-api-gateway";

const client = new APIGatewayClient({ region: process.env.AWS_REGION });

async function setupRESTAPI(APIName: string) {
  try {
    const params = {
      name: APIName,
    }
    const APICommand = new CreateRestApiCommand(params)
    const createdAPI = await client.send(APICommand)
    console.log("API ID:", createdAPI.id)
    return createdAPI;
  } catch (err) {
    console.log("Error", err);
  }
}

async function getAPI(apiId: string) {
  try {
    const params = {
      restApiId: apiId
    }
    const APICommand = new GetRestApiCommand(params)
    const gotAPI = await client.send(APICommand)
    console.log(gotAPI)
    if(gotAPI) {
      return true;
    } else {
      false
    }
  } catch (err) {
    console.log("Error", err);
  }
}

async function cleanRESTAPI() {

}

export {
  setupRESTAPI,
  getAPI,
  cleanRESTAPI
}