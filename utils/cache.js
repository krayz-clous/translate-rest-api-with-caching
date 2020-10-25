const redis = require("redis");
const PORT_REDIS = process.env.PORT || 6379;
redisClient = redis.createClient(PORT_REDIS);

const setToCache = async(key, value) => {
    redisClient.set(key, JSON.stringify(value));
}

const getFromCache = (req, res, next) => {
     let key = req.route.path+JSON.stringify(req.query);
     redisClient.get(key, (error, data) => {
       if (error){
            return _handleResponse(req, res, error);
       }
       if (data !== null){
           let response = JSON.parse(data);
           return _handleResponse(req, res, null, response);
       }
       else {
           next();
       }
      });
 }

 const inCache = async(key) =>{
    redisClient.exists(key, (err, ok) => {
        if (err) return false;
        return ok;
    });
 }

 module.exports={
    setToCache,
    getFromCache,
    inCache
 }