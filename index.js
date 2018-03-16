let server = require('./server');
let env = require('./config/env');
let router = require('./routes');

router.initRoutes();

server.listen(env.server_port, () => {
    console.log(`Server started on ${env.server_port}`);
});