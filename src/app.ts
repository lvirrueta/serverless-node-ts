import 'dotenv/config';
import { Routes } from './shared/app/router/routes';
import { Logger } from './shared/app/utilities/logger';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

console.clear();
Logger.log(`log`);
Logger.info(`info`);
Logger.warn(`warn`);
Logger.error(`error`);
Logger.debug(`debug`);
Logger.verbose(`verbose`);
console.log('----------------------------------');
Logger.warn(`Entorno de desarrollo: ${process.env.ENV_DEV}`, 'app');

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const routes = new Routes();
  try {
    return await routes.getRouter().handle(event);
  } catch (err) {
    return throwUnknownError(err);
  }
};

const throwUnknownError = (err: unknown) => {
  console.log(err);
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'some error happened',
    }),
  };
};
