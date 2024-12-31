import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { dynamoClient } from '../../../settings/dynamo.settings';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { PK_METADATA_KEY, SK_METADATA_KEY } from '../decorators/dynamo.decorators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class DynamoDBRepository<T extends Record<string, any> | undefined> {
  abstract tableName: string;
  private dynamoClient: DynamoDBClient = dynamoClient;

  public async createItem(item: T) {
    const { pk, sk } = this.getKeys(item);

    const command = new PutCommand({
      TableName: this.tableName,
      Item: item,
      ConditionExpression: this.getConditionExpression({ pk, sk }),
    });
    return await this.dynamoClient.send(command);
  }

  private getKeys(item: T): { pk: string; sk?: string } {
    if (!item) throw new Error('Item cannot be undefined');

    return {
      pk: this.getPrimaryKey(item),
      sk: this.getSortKey(item),
    };
  }

  private getConditionExpression(keys: { pk: string; sk?: string }): string {
    const { pk, sk } = keys;

    if (pk && sk) {
      return `attribute_not_exists(${pk}) AND attribute_not_exists(${sk})`;
    }
    return `attribute_not_exists(${pk})`;
  }

  private getPrimaryKey<T extends object>(obj: T): string {
    const pk = Reflect.getMetadata(PK_METADATA_KEY, obj);
    if (!pk) throw new Error('Primary key is not defined in the entity');
    return pk;
  }

  private getSortKey<T extends object>(obj: T): string | undefined {
    const sk = Reflect.getMetadata(SK_METADATA_KEY, obj);
    return sk;
  }
}
