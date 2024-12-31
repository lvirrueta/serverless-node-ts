import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiResponse } from '../../../shared/app/models/server-response';
import { PlanetService } from '../../domain/service/planet.service';

export class PlanetController {
  private planetService: PlanetService;

  constructor() {
    this.planetService = new PlanetService();
  }

  public async createPlanet(event?: APIGatewayProxyEvent) {
    const body = event?.body ? JSON.parse(event.body) : {};
    const resp = await this.planetService.createPlanet(body);
    return new ApiResponse(resp);
  }

  public async detailPlanet() {
    const body = await this.planetService.detailPlanet();
    return new ApiResponse(body);
  }
}
