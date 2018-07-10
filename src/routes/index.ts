import errorRoute from './error';
import configurationRoute from './configuration';
import server from '../shared/server';

export default {
  /**
   * Start routes of server
   */
  initRoutes() {
    server.use('/errors', errorRoute);
    server.use('/configurations', configurationRoute);
  }
}