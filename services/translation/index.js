// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;
const API_KEY = process.env.GOOGLE_TRANSALTE_API_KEY;
// Creates a client
const translate = new Translate({key:API_KEY});


const detectLanguage = async(text) => {
   // Detects text language code
    let [detections] = await translate.detect(text);
    detections = Array.isArray(detections) ? detections : [detections];
    detections.forEach(detection => {
        console.log(`${detection.input} => ${detection.language}`);
    });
    return detections;
  
}

const translateText = async (text,target) => {
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    translations.forEach((translation, i) => {
      console.log(`${text[i]} => (${target}) ${translation}`);
    });
    return translations;
}

  module.exports = {
    detectLanguage,
    translateText
  }