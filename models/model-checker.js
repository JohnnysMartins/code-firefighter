let InvalidModelException = require('../exceptions/invalid-model');

let _modelsAreValid = (reqModel, baseModel) => {
    let reqModelKeys = Object.keys(reqModel);
    let baseModelKeys = Object.keys(baseModel);

    let isValid = true;

    if (reqModelKeys.length !== baseModelKeys.length) {
        return false;
    }
    else {
        reqModelKeys.forEach((key, index) => {
            if (key !== (index <= baseModelKeys.length && baseModelKeys[index])) {
                isValid = false;
            }
        });
        return isValid;
    }
}

module.exports = {
    checkModel(reqModel, baseModel) {
        let isValid = true;

        if (!_modelsAreValid(reqModel, baseModel) ) {
            throw new InvalidModelException(reqModel, baseModel);
        }
        return true;
    }
}