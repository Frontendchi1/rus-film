 // Function to create a movie card
 function createMovieCard(movie) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <h2>${movie.nameRu} (${movie.year})</h2>
            <p>Genre: ${movie.genres.join(", ")}</p>
            <p>Description: ${movie.description}</p>
            <p>Rating: ${movie.rating}</p>
            <img src="${movie.posterUrl}" alt="Movie Poster">
        `;
    return card;
  }

  // Hide the splash screen after 4 seconds and move search container up
  setTimeout(() => {
    const splashContainer = document.getElementById("splashContainer");
    const searchContainer = document.getElementById("searchContainer");
    splashContainer.style.opacity = "0";
    searchContainer.style.marginTop = "20px";
    setTimeout(() => {
      splashContainer.style.display = "none";
    }, 1000);
  }, 4000);

  // Event listener for the search button
  document
    .getElementById("searchButton")
    .addEventListener("click", async () => {
      const movieName = document.getElementById("movieName").value.trim();

      if (movieName === "") {
        alert("Please enter a movie name");
        return;
      }

      try {
        const response = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(
            movieName
          )}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "e59d1809-6a13-483d-b59f-262b0e493258",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        const movieContainer = document.getElementById("movieContainer");
        movieContainer.innerHTML = "";

        if (data && data.films && data.films.length > 0) {
          data.films.forEach((movie) => {
            const card = createMovieCard(movie);
            movieContainer.appendChild(card);
          });
        } else {
          movieContainer.innerHTML = "<p>No similar movies found.</p>";
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching data.");
      }
    });
    


    