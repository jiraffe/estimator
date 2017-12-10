var config = {
    host:       '127.0.0.1',
    port:       2424,
    username:   'root',
    password:   'root'
};

var OrientDB = require('orientjs');
var server = OrientDB(config);

var db = server.use('VehicleHistoryGraph');

db.class.get('OUser').then(function(OUser) {
    OUser.list().then(function(records){
        console.log('Found: ' + records.length);
    });

});