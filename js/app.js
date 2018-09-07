console.log('hello')
// you will also have to setup the referring domains on your marvel developer portal
var PRIV_KEY = "efd5b4b98dcfbf76bb31fe576d0b824d1876ca3d";
var PUBLIC_KEY = "74147ee7b91d932edc968cb4cbbbdd1e";
var ts = new Date().getTime();
var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
var url = 'http://gateway.marvel.com:80/v1/public/characters';

function getMarvelResponse(charName) {
    console.log(url);
    $.getJSON(url, {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            name: charName
        })
        .done(function(data) {
            // sort of a long dump you will need to sort through
            console.log(data)
            console.log(data.data.results[0].thumbnail);

            var placeName = document.createElement("h1");
            var grabbedName = document.createTextNode(data.data.results[0].name);

            var imgHolder = document.createElement("IMG");
            imgHolder.setAttribute("src", data.data.results[0].thumbnail.path + "/standard_fantastic.jpg");

            placeName.appendChild(grabbedName);
            document.getElementById("container").appendChild(placeName);
        })
        .fail(function(err) {
            // the error codes are listed on the dev site
            console.log(err);
        });
};

getMarvelResponse("Captain America");
getMarvelResponse("Thor");
