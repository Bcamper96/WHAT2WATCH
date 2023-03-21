// global scope - scope 1
var checkList = document.getElementsByClassName('d-check');
for (i = 0; i < checkList.length; i++) {
	//for loop "local" scope - scope 2
	var anchor = checkList[i].querySelector('.anchor');
	anchor.addEventListener('click', function (event) {
		//event listener "local" scope - scope 3
		if (event.target.parentElement.classList.contains('visible')) {
			event.target.parentElement.classList.remove('visible');


		} else {
			event.target.parentElement.classList.add('visible');

		}
	})
}

$(".range-selector").click(function () {
	var range = $(this).children(".range-container")[0];
	if ($(range).hasClass("hidden")) {
		$(range).removeClass("hidden");
	} else {
		$(range).addClass("hidden");
	}
})

$("#points").on('change', function () {
	$("#pt").text(this.value)
})

$("#point").on('change', function () {
	$("#pf").text(this.value)
})

$(function () {
	$("#slider-range").slider({
		range: true,
		min: 1950,
		max: 2022,
		values: [1970, 2000],
		slide: function (event, ui) {
			$("#min").html(ui.values[0]);
			$("#max").html(ui.values[1]);
		}
	});
});

$(function () {
	$("#slider-range1").slider({
		range: true,
		min: 60,
		max: 300,
		values: [2, 3],
		slide: function (event, ui) {
			$("#min1").html(ui.values[0]);
			$("#max1").html(ui.values[1]);

		}
	});
});

// function getRandomQuote() {
// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			'X-RapidAPI-Key': '126aa9a222msh511ea90b77f0d10p1b34d9jsnbf58338755b4',
// 			'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
// 		}
// 	};

// 	fetch('https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=movies&count=1', options)
// 		.then(response => {
// 			console.log(response)
// 			response.json()
// 		})
// 		.then(data => {
// 			console.log(data)
// 			console.log(data[0].author)
// 			return data[0]
// 		})
// 		.catch(err => console.error(err));

// }

// function displayRandomQuote() {
// 	const randomQuote = getRandomQuote()
// 	if (randomQuote) {
// 		console.log(randomQuote)
// 		const quoteContainer = document.getElementById("title-container")
// 		const quoteEl = document.createElement("span")
// 		quoteEl.textContent = randomQuote.quote
// 		quoteContainer.append(quoteEl)

// 	}

// }


var pipMovies = [];
var moviecontainer = document.getElementById("movie-container")

document.querySelector(".genre-ul").addEventListener("click", popMovies)

const option = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '126aa9a222msh511ea90b77f0d10p1b34d9jsnbf58338755b4',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};
var moviedata = []
var filteredMovies = []

function popMovies() {
	moviedata = []
	filteredMovies = []
	fetch('https://online-movie-database.p.rapidapi.com/title/get-top-rated-movies', option)
		.then(response => {
			return response.json();
		})
		.then(data => {
			// console.log(data)
			for (i = 0; i < data.length; i++) {
				var ert = data[i].id.split("/");
				var ID = ert.slice(-2, -1);
				//console.log(ID);
				pipMovies.push(ID);
			};
			getpipmovies()
			// console.log(popMovies[2])
		})
};

function resolveAfter2Seconds(movieinfo, options) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(
				fetch(movieinfo, options)
					.then(response => {
						return response.json();
					})
					.then(data => {
						console.log(data)
						moviedata.push(data);
						return data
					})
			);
		}, 250);
	});
}

async function getpipmovies() {
	for (i = 0; i < 20; i++) {
		var IDurl = "https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst="
		movieinfo = IDurl.concat(pipMovies[i])
		const result = await resolveAfter2Seconds(movieinfo, options);
		console.log('success: ', result)
	}
	// checkGenre(moviedata)
	displayMovies()
}

function checkGenre(data) {
	// get checked genres
	var genreChecked = [];
	document.querySelectorAll(".checkgenre").forEach(function (checkbox) {
		if (checkbox.checked) {
			genreChecked.push(checkbox.parentElement.innerText);
		};
	});
	console.log("checkedGenre: " + genreChecked)

	//loop through movies then loop through their genre tag array,
	data.forEach(function (movieObj) {
		var movie = movieObj
		var movieGenres = movie.genres
		movieGenres.forEach(function (type) {
			if (genreChecked.includes(type)) {
				// check if already pushed if not push if yes dont push
				if (!filteredMovies.includes(movie)) {
					filteredMovies.push(movie)
				}
			}
		})
	})
	// console.log(filteredMovies)
	displayMovies()
};

function displayMovies() {
	var moviestoDisplay
	if (filteredMovies.length > 0) {
		moviestoDisplay = filteredMovies
		// console.log(moviestoDisplay)
	} else {
		moviestoDisplay = moviedata
		// console.log(moviestoDisplay)
	}

	moviestoDisplay.forEach(function(data){
		console.log("This is the movie api data",data) //prints out all api data
		var id = data.title.id //this stores the unique id for each movie
		var Title = data.title.title
		var year = data.title.year
		var movieimg = data.title.image.url
		var imgcon = document.createElement('img')
		imgcon.classList.add("img")
		var titlecon = document.createElement('h4')
		var moviebox = document.createElement('div')
		var addLater = document.createElement('button')
		var description = document.createElement('button')
		//description.setAttribute("id", "description")
		addLater.setAttribute("id", "watchLater")
		moviebox.classList.add("movie-box")
		moviebox.setAttribute("id", Title) //setting the div ID of the movie boxes to the title of the movie
		imgcon.src = movieimg
		titlecon.textContent = Title+" "+"("+year+")"
		addLater.textContent = "Watch Later"
		//description.textContent = "Description"
		moviebox.appendChild(imgcon)
		moviebox.appendChild(titlecon)
		moviebox.appendChild(addLater)
		//moviebox.appendChild(description)
		moviecontainer.appendChild(moviebox)
		
	});
	console.log("Calling add click event")
	$(function() {
		//console.info("jquaryloaded")
		// this loops over the list of movies and adds an on click handler to each movie to the list
		$("#movie-container").find('div').each(function(i, elem){
			console.log("movie-box", i, elem)
			$(elem).find('#watchLater').click(function () {
				//the button wont work if the button ID changes
				console.log("Elem:", elem)
				var recommendedlist=[]
				recommendedlist.push(elem)
				var $watchLater = $(recommendedlist).clone()
				$($watchLater).find("button").remove()
				$('#watch-container').append($watchLater)
				console.log("Jquery is running..", recommendedlist)
			})
		})
	
		$("#watch-container").each(function(i, elem) {
			console.log(i, elem)
	    })
	})
	}

popMovies()


var quotes = ['"Bond. James Bond."  - Dr. No',
'"Nobody puts Baby in a corner."  -Dirty Dancing',
'"Get your stinking paws off me, you damned dirty ape."  -Planet of the Apes',
'"Made it, Ma! Top of the world!"  -White Heat',
'"Oh, no, it wasnt the airplanes. It was Beauty killed the Beast."  -King Kong',
'"I love the smell of napalm in the morning."  -Apocalypse Now',
'"Youre gonna need a bigger boat."  -Jaws',
'"Say hello to my little friend!"  -Scarface',
'"Love means never having to say youre sorry."  -Love Story',
'"Heres looking at you, kid."  -Casablanca'];


function displayQuote() {
	var randomQuote = Math.floor(Math.random()*(quotes.length));
	var quoteEl = document.getElementById("Quote");
	quoteEl.textContent = quotes[randomQuote]

};


var HorrMovies = []

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '126aa9a222msh511ea90b77f0d10p1b34d9jsnbf58338755b4',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

function Horr() {


	fetch('https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=horror&limit=20', options)
		.then(response => {
			return response.json();
		})
		.then(data => {
			// console.log(data)
			for (i = 0; i < data.length; i++) {
				var dert = data[i].split("/");
				var ID = dert.slice(-2, -1);
				//console.log(ID);
				HorrMovies.push(ID);
			};
			getHorrMovies()
			console.log(HorrMovies)
		});
}


function getHorrMovies() {
	for (i = 0; i < 20; i++) {
		var IDurl = "https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst="
		movieinfo = IDurl.concat(HorrMovies[i])
		fetchMovie(movieinfo, options, i)
		console.log(movieinfo)
	}
}

function fetchMovie(movieinfo, options, index) {
	setTimeout(function () {
		fetch(movieinfo, options)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data)
				var Title = data.title.title
				var year = data.title.year
				var movieimg = data.title.image.url
				console.log(Title)
				var imgcon = document.createElement('img')
				imgcon.classList.add("img")
				var titlecon = document.createElement('h4')
				var moviebox = document.createElement('div')
				moviebox.classList.add("movie-box")
				imgcon.src = movieimg
				titlecon.textContent = Title + " " + "(" + year + ")"
				moviebox.appendChild(imgcon)
				moviebox.appendChild(titlecon)
				moviecontainer.appendChild(moviebox)
				// console.log(data.plotSummary.text)
				
				imgcon.addEventListener("click", function(event){
					window.open('file:///C:/Users/Alfredo/Desktop/Project%201%20Movies/Project1-Movie-App/index1.html', '_blank');
					event.preventDefault();
				})
				

			});
			
	}, index * 500)
}



document.querySelector("#submit-btn").addEventListener("click", function (event) {
	moviecontainer.replaceChildren();
	Horr()
})

// document.querySelector("#next-btn").addEventListener("click", displayQuote())