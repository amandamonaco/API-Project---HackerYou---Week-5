//Link HTML and CSS
//Import jQuery
//Read API documentation (1)
//Get API Endpoint URL
//Basic site setup
//Start with empty object to contain scripts
//Ajax Call

//User clicks on a button
//Get data - diff recipes for diff button clicked (2)
//Store that data
//Display corresponding data on the page (3)

var pineappleApp = {};

//Store API key
pineappleApp.myKey = '2f95e94af1d965c82d87b5a4a0779706';

//Run function once document is ready- call event function
pineappleApp.init = function(){
	//Start event listener
	pineappleApp.event();	
};

//ON CLICKING IMG, store the value - then display results
pineappleApp.event = function(){
	$('.recipes').on('click', function(){
		pineappleApp.query = $(this).find('svg').data('value'); 
		pineappleApp.getRecipes();
		$('section.results').addClass('show');
	});
};

//GET request to Yummly API for recipes
pineappleApp.getRecipes = function(){

	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			_app_id: 'fedcee7b',
			_app_key: pineappleApp.myKey,
			q: pineappleApp.query,
			requirePictures: true,
			allowedDiet: ['386^Vegan'],
			maxResult: 12 ,
			// start: 2
		},
		success: function(result){
			pineappleApp.results = result.matches;
			console.log(pineappleApp.results);
			pineappleApp.sortRecipes();
		}
	});
};

//Display image, title, ingredients 
pineappleApp.sortRecipes = function(){
	$('.container').empty();
	$.each(pineappleApp.results, function(item, content){
		var $title = $('<h2>').text(content.recipeName);
		var $secondTitle = $('<h3>').text('Ingredients:');
		var $ingredients = $('<p>').addClass('ingredients').text(content.ingredients);
		var imagePattern = /=s90/;
		var $image = $('<img>').attr('src', content.smallImageUrls[0].replace(imagePattern, '=s250'));
		var $recipeId = $('<a>').attr('href', 'http://www.yummly.com/recipe/' + content.id);
		var $recipeLink = $recipeId.append($image, $title, $secondTitle, $ingredients);
		var $fullRecipe = $('<div>').addClass('together').append($recipeLink);
		$('.container').append($fullRecipe);
	})
	// var $backTop = $('<a>').addClass('secondLink').attr('href', '#main').text('Choose Again!');
	// $('.backToTop').append($backTop);]
};



//DOCUMENT READY - CALL INIT FUNCTION
$(function (){
	pineappleApp.init();
	$('a').smoothScroll();
	$("#fittext").fitText(1.2, { minFontSize: '70px', maxFontSize: '120px' });
});



