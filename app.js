const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

//Schema create
const artcleSchema = {
  title : String,
  content: String
}

//Article  model create
const Article = mongoose.model("Article", artcleSchema);


app.get("/articles", function(req, res){
  Article.find(function(err, foundArticles){
    if (!err){
      res.send(foundArticles);
    }
    else{
      res.send(err);
    }
  });
});


//server port listen
app.listen(3000, function(){
  console.log("server is running on port 3000");
});
