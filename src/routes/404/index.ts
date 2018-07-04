import server from '../../shared/server';

import RouteNotFoundException from '../../shared/exceptions/RouteNotFoundException';

server.get('*', (req, res, next) => {
  next(new RouteNotFoundException(req));
});