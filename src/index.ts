import server from './shared/server';
import router from './routes';
import env from './config/env';
import middleware from './shared/server/middlewares';

middleware.initMiddlewares();
router.initRoutes();
middleware.initExceptionMiddlewares();

server.listen(env.server_port, () => {
  console.log(`Server started on ${env.server_port}`);
});