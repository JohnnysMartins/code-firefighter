import server from './shared/server';
import router from './routes';
import env from './config/env';
import middleware from './shared/server/middlewares';
import * as figlet from 'figlet';

middleware.initMiddlewares();
router.initRoutes();
middleware.initExceptionMiddlewares();

server.listen(env.server_port, () => {
  console.log("\x1b[31m", figlet.textSync('code firefighter', {
    font: 'Fire Font-s',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }), "\x1b[0m");
  console.log(`Fighting fire with fire on port ${env.server_port}`);
});