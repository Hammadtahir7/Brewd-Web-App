const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb://heroku_bm1sjwq9:mtgc4ljkntakqct2stadgv6692@ds145752.mlab.com:45752/heroku_bm1sjwq9',{ useNewUrlParser: true },function(err,db){
        if(err){
         console.log('error');
       }else {
           console.log('connected to the Test db');
       }
     });

const port = process.env.PORT || 5000;
// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
