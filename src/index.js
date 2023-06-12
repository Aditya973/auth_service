const bodyParser = require('body-parser');
const express = require('express');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const prepareAndStartServer = () =>{
    const app = express();
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{
        console.log("server listening to port ",PORT);
    });
}

prepareAndStartServer();