import { Router } from './router';
import { PlanetController } from '../../../planets/app/planet.controller';

/**
 * Clase para definir las rutas
 */
export class Routes {
  private router: Router;

  constructor() {
    this.router = new Router();

    // Registrar rutas
    this.router.register('GET', '/detail-planet', new PlanetController().detailPlanet);
    this.router.register('POST', '/create-planet', new PlanetController().createPlanet);
  }

  getRouter(): Router {
    return this.router;
  }
}
