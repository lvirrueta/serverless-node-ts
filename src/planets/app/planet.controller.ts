import { ApiResponse } from '../../shared/app/models/server-response';
import { PlanetService } from '../domain/planet.service';

export class PlanetController {
  private planetService: PlanetService;

  constructor() {
    this.planetService = new PlanetService();
  }

  public async createPlanet() {
    const body = await this.planetService.createPlanet();
    return new ApiResponse(body);
  }

  public async detailPlanet() {
    const body = await this.planetService.detailPlanet();
    return new ApiResponse(body);
  }
}
