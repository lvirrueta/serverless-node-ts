import { PlanetRepository } from '../../infrastructure/repository/planet.repository';

export class PlanetService {
  private planetRepository: PlanetRepository;

  constructor() {
    this.planetRepository = new PlanetRepository();
  }

  public async createPlanet() {
    return this.planetRepository.createPlanet();
  }

  public async detailPlanet() {
    return this.planetRepository.detailPlanet();
  }
}
