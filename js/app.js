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

            var heroBanner = document.createElement("DIV");
            heroBanner.className = "heroBanner";

            var heroTitleNode = document.createElement("DIV");
            var placeName = document.createElement("h1");
            placeName.className = "heroTitle";
            heroTitleNode.appendChild(placeName);
            var grabbedName = document.createTextNode(data.data.results[0].name);
            placeName.appendChild(grabbedName);
            $(heroBanner).append(placeName);

            var imgHolder = document.createElement("DIV");
            imgHolder.className = "heroBackgroundImage";
            var backgroundImageUrl = data.data.results[0].thumbnail.path + "/portrait_uncanny.jpg";
            $(imgHolder).css("background-image", "url('" + backgroundImageUrl + "')");
            $(heroBanner).append(imgHolder);



            document.getElementById('avengersContainer').appendChild(heroBanner);

        })
        .fail(function(err) {
            // the error codes are listed on the dev site
            console.log(err);
        });
};

getMarvelResponse("Captain America");
getMarvelResponse("Thor");
getMarvelResponse("Iron Man");
getMarvelResponse("Hulk");
getMarvelResponse("Black Widow");
getMarvelResponse("Hawkeye");
