var request = require('request');
var cheerio = require('cheerio');
var express = require('express');

const app = express();

const port = 3000;


app.get('/', function(req,res){
	
// request('http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=3&tp=1&frmdt=01-Jan-2018&todt=12-Jan-2018', function (error, response, html) 
// {
//   debugger;
//   if (!error && response.statusCode == 200) {
//     res.json(html);
//   }
// });

request('https://www.valueresearchonline.com/funds/newsnapshot.asp?schemecode=16854', function (error, response, html) 
{
  debugger;
  if (!error && response.statusCode == 200) 
  {
    // res.json(html);

    var $ = cheerio.load(html);

    $("span[itemprop='itemreviewed']").each(function()
    {
    	var a = $(this).text();
    });

    // var a = $("super-container");
    // b = a.children().eq(1).children().eq(0).children().eq(0).children().eq(6).children().eq(0);
    // c = b.prop('tagName');


    // // a = a.children[1];
    // // a = a.children[0];
    // // a = a.children[0];
    // // a = a.children[6];
    // // a = a.children[0];
    // // var b = a.textContent;
    console.log(a);

  }
});


});

app.listen(port);
console.log("listening on port 3000");
