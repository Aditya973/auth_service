const bodyParser = require('body-parser');
const express = require('express');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');
const { DB_SYNC } = require('./config/serverConfig');
 
const prepareAndStartServer = () =>{
    const app = express();
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,async ()=>{
        console.log("server listening to port ",PORT);
        if(DB_SYNC){
            // db.sequelize.sync({alter:true});
        }
    });
}

prepareAndStartServer();