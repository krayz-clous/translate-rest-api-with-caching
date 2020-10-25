const message = require('../constants/messages');
const { detectLanguage, translateText } = require("../services/translation");
// const console = require("../logger");
const languageCodes = require("../constants/languageCodes");
const { setToCache, inCache } = require("../utils/cache");

const translate = async (doc) => {
    try {
        const { phrase, targetLanguage } = doc; 

        // ===== Source Language (NOT NEEDED JUST FOR CHECKING) ====
        let detectedLanguage = await detectLanguage(phrase);
        detectedLanguage = detectedLanguage[0].input;
        if (!detectedLanguage){
            throw (message.error.SOURCE_LANG_NOT_DETECTED)
        }
        // =========================================================

        let translatedPhrase = await translateText(phrase,targetLanguage);

        let response = {
            phrase: translatedPhrase
        }

        // Immediate Response 
         return response;

        // // Test Excessive Delay of ~5seconds
        // return new Promise((resolve)=>{ setTimeout(() => { resolve(response) }, 5000)})

    } catch (e) {
        console.log("Error in translate::::",e)
        throw (e);
    }
}

const predictSimilarTranslates = async (req) =>{
    const { phrase, targetLanguage } = req.query;
    const routePath = req.route.path;
    const modQuery = req.query;
    
    // Familiar Indian Languages (Hindi,English,Marathi,Tamil,Kannada,Telegu,Malayalam,Gujarati,"Punjabi","Urdu")
    const familiarLanguages = [ "hi","en","mr","ta","kn","te","ml","gu","pa","ur"];
       
    for(let l of familiarLanguages){
        modQuery.targetLanguage = l;
        let key = routePath+JSON.stringify(modQuery);
        // Check if in Cache Already
        let prevCached = await inCache();
        if(l!=targetLanguage && !prevCached){
            try{
                let tphrase = await translateText(phrase,l);
                await setToCache(key,{phrase:tphrase});
            }catch(e){
                console.log(`Error in set familiar lang ${l}`,e)
            }
        }
    }

}




module.exports = {
    translate,
    predictSimilarTranslates
}