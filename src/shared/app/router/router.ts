import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Clase para manejar rutas
 */
export class Router {
  private routes: Map<string, (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>>;

  constructor() {
    this.routes = new Map();
  }

  public register(method: string, path: string, handler: (event?: APIGatewayProxyEvent) => Promise<any>): void {
    const key = `${method.toUpperCase()} ${path}`;
    this.routes.set(key, handler);
  }

  async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const key = `${event.httpMethod.toUpperCase()} ${event.path}`;
    const handler = this.routes.get(key);

    if (handler) {
      try {
        return await handler(event);
      } catch (err) {
        console.error(err);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Internal Server Error' }),
        };
      }
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Route not found' }),
    };
  }
}
