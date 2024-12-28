import 'dotenv/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_DYNAMO_REGION,
  endpoint: process.env.ENV_DEV == 'development' ? 'http://localhost:8000' : undefined,
  credentials: {
    accessKeyId: process.env.AWS_DYNAMO_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_DYNAMO_SECRET_ACCESS_KEY || '',
  },
});
