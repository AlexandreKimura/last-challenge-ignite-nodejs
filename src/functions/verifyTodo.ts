import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {

  const { user_id } = event.pathParameters;
  const response = await document.scan({ 
    TableName: "users_todos",
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id 
    }
  }).promise();
  
  const todo = response.Items[0];
  const todos = response.Items;
  if(todo) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        todos
      })
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "Todo não encontrado!"
    }) 
  }
}