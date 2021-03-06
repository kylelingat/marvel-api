var PRIV_KEY;
var PUBLIC_KEY;
var ts = new Date().getTime();
var hash;
var url = 'https://gateway.marvel.com:443/v1/public/characters';
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
function keyCheck() {
    PUBLIC_KEY = document.getElementById("publicKeyInput").value;
    PRIV_KEY = document.getElementById("privateKeyInput").value;
    hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    console.log(PRIV_KEY);
    console.log(PUBLIC_KEY);
    checkApiKey();
    $('#inputKeys').css("display","none");
    $('.loader').css("display","block");
}

function checkApiKey(){
  $.getJSON(url, {
          ts: ts,
          apikey: PUBLIC_KEY,
          hash: hash
      })
      .done(function(data) {
        $('.loader').css("display","none");
        console.log(url);
        $('#characters').css("display", "block")
        getMarvelResponse("Captain America");
        getMarvelResponse("Thor");
        getMarvelResponse("Iron Man");
        getMarvelResponse("Hulk");
        getMarvelResponse("Black Widow");
        getMarvelResponse("Hawkeye");
        getMarvelResponse("Gamora");
        getMarvelResponse("Groot");
        getMarvelResponse("Drax");
        getMarvelResponse("Rocket Raccoon");
        getMarvelResponse("Star-Lord (Peter Quill)");
        getMarvelResponse("Mantis");
        getMarvelResponse("Thanos");
        getMarvelResponse("Ultron");
        getMarvelResponse("Ronan")
        getMarvelResponse("Justin Hammer")
        getMarvelResponse("Ego")
        getMarvelResponse("Dormammu")
        getMarvelResponse("Red Skull")
        getMarvelResponse("Abomination (Emil Blonsky)")
        getMarvelResponse("Loki")
        getMarvelResponse("Arnim Zola")
        getMarvelResponse("Vulture (Adrian Toomes)")
        getMarvelResponse("Iron Monger")
        getMarvelResponse("Crossbones")
        getMarvelResponse("Nick Fury")
        getMarvelResponse("Maria Hill")
        getMarvelResponse("Quake (Daisy Johnson)")
        getMarvelResponse("Jimmy Woo")
        getMarvelResponse("Sharon Carter")
        getMarvelResponse("Hank Pym")

      })
      .fail(function(err) {
          console.log(err);
          $('.loader').css("display","none");
          $('#inputKeys').css("display","flex");
          $("#publicKeyLabel").html("Enter your Public API Key <span>(Oops, you have entered an incorrect API key)</span>")
          $("#privateKeyLabel").html("Enter your Private API Key <span>(Oops, you have entered an incorrect API key)</span>")
      });
}

function getMarvelResponse(charName) {
    console.log(url);
    $.getJSON(url, {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            name: charName
        })
        .done(function(data) {
          console.log(data.data.results[0])
            var heroBanner = document.createElement("DIV");
            heroBanner.className = "heroBanner";

            var heroTitleNode = document.createElement("DIV");
            var placeName = document.createElement("h1");
            placeName.className = "heroTitle";
            heroTitleNode.appendChild(placeName);
            var nameApi = data.data.results[0].name;
            if (nameApi == "Star-Lord (Peter Quill)") {
                nameApi = "Star-Lord"
            } else if (nameApi == "Abomination (Emil Blonsky)") {
                nameApi = "Abomination"
            } else if (nameApi == "Vulture (Adrian Toomes)") {
                nameApi = "Vulture"
            } else if (nameApi == "Quake (Daisy Johnson)") {
                nameApi = "Quake"
            }
            var grabbedName = document.createTextNode(nameApi);
            placeName.appendChild(grabbedName);
            $(heroBanner).append(placeName);

            var imgHolder = document.createElement("DIV");
            imgHolder.className = "heroBackgroundImage";
            var backgroundImageUrl = data.data.results[0].thumbnail.path + "/portrait_uncanny.jpg";
            $(imgHolder).css("background-image", `url(${backgroundImageUrl})`);
            var heroBackgroundImageContainer = document.createElement("DIV");
            heroBackgroundImageContainer.className = "heroBackgroundImageContainer";
            $(heroBanner).append(heroBackgroundImageContainer);
            $(heroBackgroundImageContainer).append(imgHolder);

            heroBackgroundImageContainer.onclick = function() {
                modal.style.display = "block";
                var modalName = document.createElement("h1");
                modalName.className = "heroModalName";
                modalName.appendChild(document.createTextNode(nameApi));
                $("#heroModalNameContainer").append(modalName);
                var modalImage = data.data.results[0].thumbnail.path + "/portrait_incredible.jpg";
                $("#modalImageContainer").css("background-image", `url(${modalImage})`);
                var modalBio = data.data.results[0].description;
                if(modalBio == ""){
                  $("#midSection").addClass("noBio");
                  $("#modalImageContainer").addClass("noBioImage");
                } else if (modalBio != ""){
                  $("#midSection").removeClass("noBio");
                  $("#modalImageContainer").removeClass("noBioImage")
                }

                $("#modalBio").text(modalBio)






            };

            span.onclick = function() {
                modal.style.display = "none";
                $(".modalGridItem").empty()
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    $(".modalGridItem").empty()
                }
            }



            if (nameApi == "Thor" ||
                nameApi == "Captain America" ||
                nameApi == "Iron Man" ||
                nameApi == "Hulk" ||
                nameApi == "Black Widow" ||
                nameApi == "Hawkeye") {
                document.getElementById('avengersContainer').appendChild(heroBanner);
            } else if (nameApi == "Star-Lord" ||
                nameApi == "Gamora" ||
                nameApi == "Drax" ||
                nameApi == "Groot" ||
                nameApi == "Rocket Raccoon" ||
                nameApi == "Mantis") {
                document.getElementById('gotgContainer').appendChild(heroBanner);
            } else if (nameApi == "Thanos" ||
                nameApi == "Ultron" ||
                nameApi == "Ronan" ||
                nameApi == "Justin Hammer" ||
                nameApi == "Ego" ||
                nameApi == "Dormammu" ||
                nameApi == "Red Skull" ||
                nameApi == "Abomination" ||
                nameApi == "Loki" ||
                nameApi == "Arnim Zola" ||
                nameApi == "Vulture" ||
                nameApi == "Crossbones") {
                document.getElementById('villainsContainer').appendChild(heroBanner)
            } else if (nameApi == "Nick Fury" ||
                nameApi == "Maria Hill" ||
                nameApi == "Quake" ||
                nameApi == "Jimmy Woo" ||
                nameApi == "Sharon Carter" ||
                nameApi == "Hank Pym") {
                document.getElementById('shieldContainer').appendChild(heroBanner)
            }

        })
        .fail(function(err) {
            console.log(err);
        });
};
