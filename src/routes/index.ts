import errorRoute from './error';
import configurationRoute from './configuration';

export default {
  /**
   * Start routes of server
   */
  initRoutes() {
    errorRoute.initRoute();
    configurationRoute.initRoute();
  }
}