const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/parchesarmas";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.catch(error => console.log(error))
.then(db => console.log("bd de datos conectada"))
