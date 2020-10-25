
const { Validator } = require('node-input-validator');
const message = require('../constants/messages');
const languageCodes = require("../constants/languageCodes");

module.exports = {
    validateTranslateObj: async function (dataObj) {
        let { phrase, targetLanguage } = dataObj
        const v = new Validator(dataObj, {
            phrase: 'required|string',
            targetLanguage: 'required|string',
           
        });

        if(!languageCodes.includes(targetLanguage)){
            throw (message.error.INVALID_TARGET_LANGUAGE_CODE);
        }

        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        } else {
            return {
                phrase:phrase,
                targetLanguage:targetLanguage
            }
        }
    },

   

  
}