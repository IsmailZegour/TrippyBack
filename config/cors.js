const cors = require("cors");
const fronturl = process.env.FRONT_APP_URL+':'+process.env.FRONT_APP_PORT;
console.log('Server is comunicating with : '+fronturl);
const whitelist = [fronturl];

/*var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials : true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
exports.corsWithOptions = cors(corsOptionsDelegate);*/

corsOptions = {  credentials: true, origin: ['http://localhost:4200', 'http://localhost', 'http://localhost:8080']}

module.exports = cors(corsOptions);
