import { createServer, OutgoingHttpHeaders } from 'http';
import { lambdaHandler } from './src/app';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { Logger } from './src/shared/app/utilities/logger';

const server = createServer(async (req, res) => {
  const chunks: Buffer[] = [];

  // Leer el cuerpo de la petición
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', async () => {
    const body = Buffer.concat(chunks).toString();

    // Simular un evento de API Gateway
    const event: APIGatewayProxyEvent = {
      httpMethod: req.method ?? '',
      path: req.url ?? '',
      headers: Object.fromEntries(Object.entries(req.headers).map(([key, value]) => [key, Array.isArray(value) ? value.join(',') : value])),
      body: body || null,
      multiValueHeaders: {},
      isBase64Encoded: false,
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: '',
        apiId: '',
        authorizer: null,
        protocol: '',
        httpMethod: req.method ?? '',
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: '',
          user: null,
          userAgent: null,
          userArn: null,
        },
        path: req.url ?? '',
        stage: '',
        requestId: '',
        requestTimeEpoch: 0,
        resourceId: '',
        resourcePath: '',
      },
      resource: '',
    };

    try {
      // Llama al handler de Lambda
      const response = await lambdaHandler(event);

      res.writeHead(response.statusCode || 200, (response.headers as OutgoingHttpHeaders) || {});
      res.end(response.body || '');
    } catch (error) {
      console.error('Error al ejecutar el handler:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error interno del servidor' }));
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  Logger.log(`Simulador de API Gateway escuchando en http://localhost:${PORT}`, 'local-api-gateway');
});
