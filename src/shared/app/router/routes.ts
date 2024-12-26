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
    const planetController = new PlanetController();
    this.router.register('GET', '/detail-planet', planetController.detailPlanet.bind(planetController));
    this.router.register('POST', '/create-planet', planetController.createPlanet.bind(planetController));
  }

  getRouter(): Router {
    return this.router;
  }
}
