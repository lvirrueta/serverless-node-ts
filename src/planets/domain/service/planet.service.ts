import { PlanetRepository } from '../../infrastructure/repository/planet.repository';
import { IPlanet } from '../interface/planet.interface';

export class PlanetService {
  private planetRepository: PlanetRepository;

  constructor() {
    this.planetRepository = new PlanetRepository();
  }

  public async createPlanet(dto: IPlanet) {
    return this.planetRepository.createPlanet(dto);
  }

  public async detailPlanet() {
    return this.planetRepository.detailPlanet();
  }
}
