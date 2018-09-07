console.log('hello')
// you will also have to setup the referring domains on your marvel developer portal
var PRIV_KEY = "efd5b4b98dcfbf76bb31fe576d0b824d1876ca3d";
var PUBLIC_KEY = "74147ee7b91d932edc968cb4cbbbdd1e";

function getMarvelResponse() {

  // you need a new ts every request
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();



  var url = 'http://gateway.marvel.com:80/v1/public/characters';

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    name: "Groot"
    })
    .done(function(data) {
      // sort of a long dump you will need to sort through
      console.log(data.data.results[0]);
      $("#test").text(data.data.results[0].name)
      $("#my_image").attr("src","second.jpg");
    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err);
    });
};

getMarvelResponse();
