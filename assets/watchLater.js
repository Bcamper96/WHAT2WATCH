// fuction to add movie to watch later on 2nd html
function watchLater(params) {
    console.log("watch later ran")
		var imgcon = document.createElement('img')
		imgcon.classList.add("img")
		var titlecon = document.createElement('h4')
		var moviebox = document.createElement('div')
		moviebox.classList.add("movie-box")
		moviebox.setAttribute("id", "Halloween Ends") //setting the Div Id of the movie box to the title of the movie
		imgcon.src ="https://m.media-amazon.com/images/M/MV5BZTg1Y2Q3MzctMDlkOS00OGE1LWE4MjUtNmJjNDNkZmM2YmVkXkEyXkFqcGdeQXVyMjY5ODI4NDk@._V1_.jpg"
		titlecon.textContent = "Halloween Ends"
		moviebox.appendChild(imgcon)
		moviebox.appendChild(titlecon)
		//moviebox.appendChild(description)  this is not needed for now
        $('#watch-container').append(moviebox)
}