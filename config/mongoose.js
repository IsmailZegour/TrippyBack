const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Chat', { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
if(err) {
    console.log(err)
} else {
    console.log('Connected to mongodb')
}
})

module.exports= mongoose;