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



////////////////////////// REQUEST TARGETING ALL ARTICLES/////////////////////
app.route("/articles")

.get(function(req, res){
  Article.find(function(err, foundArticles){
    if (!err){
      res.send(foundArticles);
    }
    else{
      res.send(err);
    }
  });
})

.post(function(req, res){

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

})

.delete(function(req, res){
  Article.deleteMany(function(err){
    if (!err){
      res.send("successfully deleted all the articles.");
    } else {
      res.send(err);
    }
  });
});


////////////////////////// REQUEST TARGETING A SPECIFIC ARTICLE////////////////
app.route("/articles/:articleTitle")

.get(function(req, res){
  Article.findOne({title: req.params.articleTitle}, function(req, foundArticle){
    if (foundArticle){
      res.send(foundArticle);
    } else {
      res.send("no articles matching that title was found");
    }
  });
})

.put(function(req, res){

  Article.updateOne(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    function(err){
      if (!err){
        res.send("successfully updated Article.");
      }
    }
  );

})

.patch(function(req, res){
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if (!err){
        res.send("successfully updated the article");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if(!err){
        res.send("successfully deleted the corresponding article");
      }
      else {
        res.send(err);
      }
    }
  );
});


//server port listen
app.listen(3000, function(){
  console.log("server is running on port 3000");
});
