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

//GET ROUTE
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


//POST ROUTE
app.post("/articles", function(req, res){

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if (!err){
      res.send("successfully added a new article");
    }
    else {
      res.send(err);
    }
  });

});


//DELETE ROUTE

app.delete("/articles", function(req, res){
  Article.deleteMany(function(err){
    if (!err){
      res.send("successfully deleted all the articles.");
    } else {
      res.send(err);
    }
  });
});


//server port listen
app.listen(3000, function(){
  console.log("server is running on port 3000");
});
