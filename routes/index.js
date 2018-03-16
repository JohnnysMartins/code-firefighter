const modelFolder = './routes/';
const fs = require('fs');

module.exports = {
    /**
     * Start routes of server
     */    
    initRoutes() {
        // Init all routes from ./routes folder
        fs.readdirSync(modelFolder).forEach(folder => {
            // check if the folder name isn't a file name
            if (folder.indexOf('.') < 0) {
                require(`./${folder}/${folder}`);
            }
        });
    }
}