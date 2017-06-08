
let req = require('request');

var url = "";


var getBaseUrl = new Promise(function(resolve,reject){
  req.get('https://www.yahoo.com/news',function(err,response,body){
    if(err) return reject();
    else if(response.statusCode == '404') return reject();
    else {
      var link = body.match(/\<a[^\>]*href\=\"([^\>]+)\"[^\>]*data\-reactid\=\"7\"\>/);
      url = link[1];
      console.log(url);
      return resolve(url);
    }
  });
});

getBaseUrl.then(function(url){
  req.get('https://www.yahoo.com'+url,function(err,response,body){
    if(err) console.log(err);
    if(response.statusCode == 200) {
      var para = body.match(/<p[^<]+content\="([^<]*)"[^<]*data-reactid\="[\d]+">/)[1];
      console.log(para);
    }
    if(response.statusCode == 404){
      console.log("Sorry, I couldn't find the page. Try again, please");
    }
  });
},function(){
  console.log("Something went wrong! Please try again.");
});
