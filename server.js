const express = require('express')
const bodyParser = require('body-parser')
const  MongoClient = require('mongodb').MongoClient
//MongoClient.Promise = global.Promise;
const port = 63564
const url ='mongodb+srv://userMakan:TSchVEARysJw7t%24N@makan.d7vnw.mongodb.net/Livnhigh?authSource=admin&replicaSet=atlas-umvccw-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
const fs= require('fs')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

// app.set('index.html')
 app.use(express.static(__dirname + '/public'));
// app.get('/',(req, res) => {
// res.render('index')
// })

app.get('/', (req,res)=>
{
  res.writeHead(200, {'content-stype':'text/html'})
  fs.createReadStream('index.html').pipe(res)
})

app.listen(port, () => {
    console.log("server listerning on port " + port)
})
// app.post('/savedata', function (req, res) {
//     dbConn.then(function(db) {
//         db.MemberInfo.insertOne(req.body);
//     });    
//     res.send('Data received:\n' + JSON.stringify(req.body));
// });
MongoClient.connect(url, function(err, db){
  var dbo = db.db('Livnhigh');
   app.post('/savedata', function (req, res) {
    var myobj = {"name":req.body.firstname,"dateOfBirth":req.body.dateofbirth,"email":req.body.lastname}
    dbo.collection("MemberInfo").insertOne(myobj, function(err, res) {
      db.close();
      });
    });
});

