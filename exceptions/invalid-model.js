module.exports = function Exception (reqModel, baseModel) {
    this.name = "InvalidModelException";
    this.message = `[${Object.keys(reqModel)}] is not the same as [${Object.keys(baseModel)}]`;    
}