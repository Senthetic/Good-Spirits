var songs = [];
var availLiquor = [];
var ingredientString = [];
var seconds = 0;
//look into switch cases to 
//just put in the basic api setup proving data transfer, commented out the append methods to limit issues for now.
$(document).ready(function () {
  var queryInitial =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  var searchDrink = "Mojito";
  var queryURL = queryInitial + searchDrink;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // in this function I will pass in the name of drink and save all data needed to be displayed.
    //$("#drinks-here").append(response.drinks[0].strDrink);
    // $("#instructions-here").append(response.drinks[0].strInstructions);
    drinkPics.push(response.drinks[0]["strDrinkThumb"]);
    for (var i = 1; i <= 15; i++) {
      var key = "strIngredient" + i;
      if (response.drinks[0][key] !== null) {
        ingredientString.push(response.drinks[0][key]);
        //ingredientString = ingredientString + " " + response.drinks[0][key];
        // availLiquor[i].ingredients.push(response.drinks[0][key]);
        // console.log(availLiquor[i].ingredients);
        //$("#ingredients-here").append(response.drinks[0][key]);
      }
      console.log(response.drinks[0][key]);
      console.log(ingredientString);
    }
    //$("#drinks-here").append(response.drinks[0].strDrink);
  });

  var search = "eminem";
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search,
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "c44498c14bmsh109c8caa20abc0ep12e719jsnc8f75e4181e0",
    },
  };
  //in this anonymous function I will pass in the name of the song and save all data to be displayed.
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.data[0].preview);
    //  $("#info-here").append(response.hosts.images);
  });
});
//updates song taking in mp3 file
function makeMusic(mp3){
  $("#music-player")[0].src = mp3;
  
}

// function getDrinkData(drinkTarget){
//   var queryInitial =
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
//   var searchDrink = drinkTarget;
//   var queryURL = queryInitial + searchDrink;
//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//     // in this function I will pass in the name of drink and save all data needed to be displayed.
//     //$("#drinks-here").append(response.drinks[0].strDrink);
//     // $("#instructions-here").append(response.drinks[0].strInstructions);
//     drinkPics.push(response.drinks[0]["strDrinkThumb"]);
//     drinkInstr.push(response.drink[0]["strInstructions"]);
//     for (var i = 1; i <= 15; i++) {
//       var key = "strIngredient" + i;
//       if (response.drinks[0][key] !== null) {
//         ingredientString.push(response.drinks[0][key]);
//       //  drinkPics.push(response.drinks[0]["strDrinkThumb"]);
//         // console.log("Pic: " + response.drinks[0]["strDrinkThumb"]);
//          console.log("drinkPics " + drinkPics);
//       //ingredientString = ingredientString + " " + response.drinks[0][key];
//         // availLiquor[i].ingredients.push(response.drinks[0][key]);
//         // console.log(availLiquor[i].ingredients);
//         //$("#ingredients-here").append(response.drinks[0][key]);
//       }
//       console.log(response.drinks[0][key]);
//       console.log(ingredientString);
//     }
// })
// onclick functions- DO NOT PUT THESE INSIDE DOCUMENT READY!
//$("#happy").on("click",getHappy);

    // appending the image of the drink to the dom
    var drinkImage = response.drinks[0].strDrinkThumb;
    $("#drink-image").append(`<img id="drink-id" src=${drinkImage} />`);

    for (var i = 1; i <= 15; i++) {
      var key = "strIngredient" + i;
      if (response.drinks[0][key] !== null) {
        console.log(response.drinks[0][key]);
      }
      $("#drink-ingredients").append(response.drinks[0][key]);
    }
    // $("#drinks-here").append(response.drinks[0].strDrink);
    for (var i = 1; i <= 15; i++) {
      var measure = "strMeasure" + i;
      if (response.drinks[0][measure] !== null) {
        console.log(response.drinks[0][measure]);
      }
      $("#drink-ingredients").append(response.drinks[0][measure]);
    }

    $("#drink-instructions").append(response.drinks[0].strInstructions);
    console.log(response.drinks[0].strInstructions);
  });

  // ELIZABETH'S CODE -----------------------------------
  var moodMusicArray = [];
  var moodBoozeArray = [];
  var moodEl;
  var musicEl;
  var boozeEl;

  // event listener to get selected mood
  $(".imagesMood").click(function() {
    var mood = $(this)[0].offsetParent.id;
    moodEl = mood;
    console.log(moodEl);
    toMusicPage();
  })

  // event listener to get selected music genre
  $(".imagesMusic").click(function() {
    var music = $(this)[0].offsetParent.id;
    musicEl = music;
    console.log(musicEl);
    chooseUserSong();
    toBoozePage();
  })

  // event listener to get selected alcohol choice
  $(".imagesBooze").click(function() {
    var booze = $(this)[0].offsetParent.id;
    boozeEl = booze;
    console.log(boozeEl);
    chooseUserDrink();
    toResultsPage();
  })

  // this function is called after the user selects music
  // this function returns an array to determine the song
  function chooseUserSong() {
    moodMusicArray = [];
    moodMusicArray.push(moodEl, musicEl);
    console.log(moodMusicArray);
  }
  
  // this function is called after the user selects alcohol
  // this function returns an array to determine the drink
  function chooseUserDrink() {
    moodBoozeArray = [];
    moodBoozeArray.push(moodEl, boozeEl);
    console.log(moodBoozeArray);
  }

}); // end of document.ready

//on click on play button, this function is responsible for updating the playlist song, will need a counter incrementing every second until 30, when this happens change the src attr in the audio tag and replace it with the next song.
// function playlist(){
//   console.log("Playlist was called!");
//   $("#music-player-source").attr("src","https://cdns-preview-9.dzcdn.net/stream/c-9571d1a0be0db0b03e001cbdaffdc458-7.mp3");
//     seconds += 1;
//     if(seconds==30){
//      // $("#music-player-source").attr("src","https://deezerdevs-deezer.p.rapidapi.com/search?q=rick+ross");

//     }
// }
// playlist();
//var cancel = setInterval(playlist, 1000);

//this function is responsible for displaying all the results
// function displayDrinks(){

// }

//-------------------------------------------------
// onclick functions- DO NOT PUT THESE INSIDE DOCUMENT READY!

// navigate from landing page to age verification page
function toAgeVerificationPage() {
  $("#landing-page").hide();
  $("#age-verification-page").show();
}

// redirects to landing page when user clicks "back" from any page
function toLandingPage() {
  $("#age-verification-page").hide();
  $("#mood-page").hide();
  $("#music-page").hide();
  $("#kids-page").hide();
  $("#booze-page").hide();
  $("#results-page").hide();
  $("#landing-page").show();
}

// if user is 21, this navigates forward to mood page
function toMoodPage() {
  $("#age-verification-page").hide();
  $("#music-page").hide();
  $("#mood-page").show();
}

// this navigates forward to music page
function toMusicPage() {
  $("#mood-page").hide();
  $("#booze-page").hide();
  $("#music-page").show();
}

// if user is under 21, this navigates to a kids friendly page
function toKidsPage() {
  $("#age-verification-page").hide();
  $("#kids-page").show();
}

function toBoozePage() {
  $("#music-page").hide();
  $("#booze-page").show();
}

function toResultsPage() {
  $("#booze-page").hide();
  $("#results-page").show();
}
