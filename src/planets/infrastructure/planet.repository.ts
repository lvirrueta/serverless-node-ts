export class PlanetRepository {
  public async createPlanet() {
    return { message: 'planet created' };
  }

  public async detailPlanet() {
    return { planet: 'Earth' };
  }
}
