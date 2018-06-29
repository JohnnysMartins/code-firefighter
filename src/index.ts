import server from './shared/server';
import router from './routes';
import env from './config/env';

router.initRoutes();

server.listen(env.server_port, () => {
  console.log(`Server started on ${env.server_port}`);
});