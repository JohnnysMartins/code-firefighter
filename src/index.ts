import { readFileSync } from 'fs';
import server from './server';
import router from './routes';

const env = JSON.parse(readFileSync('./config/env.json', 'utf-8'));

router.initRoutes();

server.listen(env.server_port, () => {
    console.log(`Server started on ${env.server_port}`);
});