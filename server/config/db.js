const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://chronicSurfer:Lifeguard1208@ds255364.mlab.com:55364/surf-tracker', {
useNewUrlParser: true
    }, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Database is connected');
        }
    }
);
