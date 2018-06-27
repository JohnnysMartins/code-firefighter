import server from './server';
import env from './config/env';
import router from './routes';

router.initRoutes();

server.listen(env.server_port, () => {
    console.log(`Server started on ${env.server_port}`);
});