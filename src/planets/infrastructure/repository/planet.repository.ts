import { DynamoDBRepository } from '../../../shared/infrastructure/repository/dynamodb-repository';
import { PlanetEntity } from '../entity/planet.entity';

export class PlanetRepository extends DynamoDBRepository<any> {
  tableName = 'Planets';

  public async createPlanet() {
    console.log('creando planeta');
    const newPlanet = new PlanetEntity({
      Galaxy: 'Via Lactea',
      Planet: 'Tierra',
      SongTitle: 'Call Me Today',
      Year: 2021,
    });
    return await this.createItem({
      Galaxy: { S: 'Via Lactea' },
      Planet: { S: 'Tierra' },
      SongTitle: { S: 'Call Me Today' },
      Year: { N: '2021' },
    });
    return { message: 'planet created' };
  }

  public async detailPlanet() {
    return { planet: 'Earth' };
  }
}
