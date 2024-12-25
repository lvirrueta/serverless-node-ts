export class ApiResponse {
  private statusCode: number;
  private body: string | object;
  private headers: { [key: string]: string };

  constructor(bod?: string | object, obj?: IServerResponse) {
    const { statusCode, body, headers } = { ...obj };
    this.statusCode = statusCode ?? 200;
    this.body = body ? JSON.stringify(body) : JSON.stringify(bod);
    this.headers = headers ?? { 'Content-Type': 'application/json' };
  }
}

interface IServerResponse {
  statusCode?: number;
  body: string | object;
  headers?: { [key: string]: string };
}
