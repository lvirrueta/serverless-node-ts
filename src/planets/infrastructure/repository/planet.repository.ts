import { DynamoDBRepository } from '../../../shared/infrastructure/repository/dynamodb-repository';
import { IPlanet } from '../../domain/interface/planet.interface';
import { PlanetEntity } from '../entity/planet.entity';

export class PlanetRepository extends DynamoDBRepository<PlanetEntity> {
  tableName = 'Planets';

  public async createPlanet(dto: IPlanet) {
    const newPlanet = new PlanetEntity(dto);
    return await super.createItem(newPlanet);
  }

  public async detailPlanet() {
    return { planet: 'Earth' };
  }
}
