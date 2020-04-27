const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoClient = require('mongodb');
const url = "mongodb://localhost:27017";

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.post('/generateurl', function (req, res) {
    var random_string=Math.random().toString(32).substring(2,5);
    console.log(random_string);
    
    let data ={
       'longurl':req.body.longurl,
       'shorturl':random_string,
       'clickcount':0

    }
    mongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
        if (err) throw err;
        var db = client.db("urlsdb");
        db.collection("urllist").insertOne((data), function (err, result) {
            if (err) throw err;
            console.log("URL Added in DB");
            res.send(data);
            client.close();
        });
    });

});

app.get('/allurl', function (req, res) {
     console.log(req.body)
    mongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
        if (err) throw err;
        var db = client.db("urlsdb");
       var urllist= db.collection("urllist").find().toArray();
       urllist.then(function(data){
                  
            res.json(data);
            client.close();
        })
        .catch(function(err){
         client.close();
         res.json({
             message:"Error"
         })
        })
    });

});
    app.get('/redirecturl/:id', function (req, res) {
        console.log(req.params.id);
        mongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
            if (err) throw err;
            var db = client.db("urlsdb")
            var resData=db.collection("urllist").findOneAndUpdate({ shorturl: req.params.id },{$inc:{clickcount:1}});            
            
            resData.then(function(data){
               // client.close();         
                res.redirect(data.value.longurl);
            })
            .catch(function(err){
                client.close();
                res.json({
                    message:"Error"
                })
            })
        });
    });

app.listen(3000, function () {
    console.log('Port is running in 3000')
});