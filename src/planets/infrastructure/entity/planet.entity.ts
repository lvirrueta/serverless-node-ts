import { PK, SK } from '../../../shared/infrastructure/decorators/dynamo.decorators';
import { IPlanet } from '../../domain/interface/planet.interface';

export class PlanetEntity implements IPlanet {
  @PK()
  public Galaxy: string;

  @SK()
  public Planet: string;

  public SongTitle: string;
  public Year: number;

  constructor(obj: IPlanet) {
    this.Galaxy = obj.Galaxy;
    this.Planet = obj.Planet;
    this.SongTitle = obj.SongTitle;
    this.Year = obj.Year;
  }
}
