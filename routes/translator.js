var express = require('express');
var router = express.Router();
const translatorController = require("../controller/translatorController")
const { getFromCache } = require("../utils/cache");

router.get('/translate', getFromCache, translatorController.translate)

module.exports = router