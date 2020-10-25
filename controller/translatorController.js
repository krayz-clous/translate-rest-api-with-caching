const message = require('../constants/messages')
const dataValidator = require("../validator/dataTranslatorValidator");
const translatorProvider  = require("../provider/translatorProvider");
const console = require('../logger');
const { setToCache } = require("../utils/cache");


const translate = async (req, res) => {
    try {
        console.log("translateController translate ::: ");
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        let doc = await dataValidator.validateTranslateObj(req.query);
        const response = await translatorProvider.translate(doc);
        
        // Caching the Request
        const key = req.route.path+JSON.stringify(req.query);
        setToCache(key,response);

        // Predict other familiar languages
        translatorProvider.predictSimilarTranslates(req);
        
        return _handleResponse(req, res, null, response);
    } catch (e) {
        return _handleResponse(req, res, e)
    }
}


module.exports = {
    translate
}