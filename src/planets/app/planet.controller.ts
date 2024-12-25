import { ApiResponse } from '../../shared/app/models/server-response';

export class PlanetController {
  public async createPlanet() {
    const body = { message: 'planet created' };
    return new ApiResponse(body);
  }

  public async detailPlanet() {
    const body = { planet: 'Earth' };
    return new ApiResponse(body);
  }
}
