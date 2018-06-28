import * as fs from 'fs';

export default {
  /**
   * Start routes of server
   */
  initRoutes() {
    // Init all routes from ./routes folder
    fs.readdirSync('./src/routes').forEach(folder => {
      // check if the folder name isn't a file name
      if (folder.indexOf('.') < 0) {
        import (`./${folder}`);
      }
    });
  }
}