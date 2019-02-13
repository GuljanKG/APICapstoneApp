'use strict'

const BASE_URL =
  'https://www.themealdb.com/api/json/v1/1/';



function apiSearchRequest(mealName) {
  let completeSearchUrl = BASE_URL + `search.php?s=${mealName}`;


  fetch(completeSearchUrl)
    .then(responseJson => {
      if (responseJson.ok) {
        return responseJson.json();
      }
      else {
        throw "Something went wrong.";
      }
    })
    .then(data => {

      displaySearchResults(data.meals);

    })
    .catch(err => {
      console.log(err);
    })
}



function displaySearchResults(data) {
  $(".results").html("");
  //console.log(data);
  //const currentId = $(this).data("meal-id");
  for (let i = 0; i < data.length; i++) {
    $(".results").append(`
                      <div>
                      <a href="https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data[i].idMeal}"></a>
                      <h4>
                      ${data[i].strMeal}</h4>
                 <h6>Category: ${data[i].strCategory}</h6>  <img src="${data[i].strMealThumb}" class="mealImage" data-meal-id="${data[i].idMeal}">
                      </div>
                      `);
  }
}

//lookup api
function getFullRecipes(data) {

  $('.results').on('click', '.mealImage', function (event) {
    //const currentId = data[i].idMeal;
    let currentId = $(this).data("meal-id");
    //console.log(`imageclicked : ${currentId}`);


    // Second fetch call to get the instruction of the meals. 

    let completeRecipesUrl = BASE_URL + `lookup.php?i=${currentId}`;
    console.log(completeRecipesUrl);
    // https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data[i].idMeal}

    fetch(completeRecipesUrl)
      .then(responseJson => {
        if (responseJson.ok) {
          return responseJson.json();
        }
        else {
          throw "Something went wrong.";
        }
      })
      .then(data => {

        displayFullRecipeResults(data.meals);

      })
      .catch(err => {
        console.log(err);
      })

    event.preventDefault();
  });

}


function displayFullRecipeResults(data) {


  $(".results").html("");
  //console.log(data);
  for (let i = 0; i < data.length; i++) {

    let newInstructions = data[i].strInstructions;
    newInstructions = newInstructions.replace(/(?:\r\n|\r|\n)/g, '<br><br>');
    // newInstructions = newInstructions.replace(/\/C/g, '&#8451;');
    // newInstructions = newInstructions.replace('/C', '&#8451;');
    console.log('stringInstructions' + newInstructions);

    $(".resultsFull").append(`
                      <div class="instruction">
                      <h2>${data[i].strMeal} </h2>
                      <p> ${newInstructions} </p>
                         <a href="${data[i].strYoutube}" target="_blank" 
                         class="strYoutube"> Click for Youtube video instruction </a>
                          <img src="${data[i].strMealThumb}" class="fullRecipeImage">
                      </div>
                      `);
  }


}

// function addLineBreaks(data) {
//   //your code here
//   //console.log(data.lyrics)
//   let myResults = data.instructions //put the data in a variable
//   myResults = myResults.replace(/(?:\r\n|\r|\n)/g, '<br>'); // replace the \r\n with br tags
//   $('.js-search-results').html(myResults)
// }

function titleAnimation() {
  let title = $('#mainTitle');
  setTimeout(function () {
    title.html("find");
  }, 400);
  setTimeout(function () {
    title.html("find easy");
  }, 800);
  setTimeout(function () {
    title.html("find easy recipes");
  }, 1200);

}


function watchForm() {
  $('.mealForm').on('click', '.submitMeal', function (event) {
    event.preventDefault();
    $('.instruction').remove();
    const mealName = $('.searchTerm').val();
    apiSearchRequest(mealName);
    $('.searchTerm').val('');
  });
}


$(watchForm);
$(getFullRecipes);
$(titleAnimation);
