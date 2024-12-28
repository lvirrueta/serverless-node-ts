import 'dotenv/config';
import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import { dynamoClient } from '../src/settings/dynamo.settings';

export const main = async () => {
  const command = new CreateTableCommand({
    TableName: 'Planets',
    KeySchema: [
      { AttributeName: 'Galaxy', KeyType: 'HASH' }, // Partition Key
      { AttributeName: 'Planet', KeyType: 'RANGE' }, // Sort Key
    ],
    AttributeDefinitions: [
      { AttributeName: 'Galaxy', AttributeType: 'S' },
      { AttributeName: 'Planet', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  });

  const response = await dynamoClient.send(command);
  console.log(response);
  return response;
};

main();
