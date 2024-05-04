var favoritesCount = {}; // Object to keep track of the counts

function displayPokemon(pokemonList) {
  const display = document.getElementById("pokemon-display");
  pokemonList.forEach((pokemon) => {
    addPokemonToDisplay(pokemon);
  });
}

function addToFavorites(pokemonName) {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
  if (favorites[pokemonName]) {
    favorites[pokemonName]++;
  } else {
    favorites[pokemonName] = 1;
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function updateFavoritesDisplay() {
  const favList = document.getElementById("favorites-list");
  favList.innerHTML = ""; // Clear the current list to rebuild it

  for (const pokemonName in favoritesCount) {
    const count = favoritesCount[pokemonName];
    const favItem = document.createElement("li");
    favItem.textContent = `${pokemonName} (${count})`; // Display name with count
    favList.appendChild(favItem);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchInitialPokemon();
  var searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", handleSearchClick);
});

function fetchInitialPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then((response) => response.json())
    .then((data) => {
      displayInitialPokemon(data.results);
    });
}

function displayInitialPokemon(pokemonList) {
  const display = document.getElementById("pokemon-display");
  display.innerHTML = "";
  pokemonList.forEach((pokemon) => {
    fetchPokemonData(pokemon.url, true);
  });
}

function fetchPokemonData(url, isInitial = false) {
  fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      if (isInitial) {
        addPokemonToDisplay(pokemon);
      } else {
        displayPokemonData(pokemon);
      }
    });
}

function addPokemonToDisplay(pokemon) {
  const display = document.getElementById("pokemon-display");
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon-card");
  pokemonElement.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="Image of ${pokemon.name}" style="width:100px;height:100px;">
      <p>${pokemon.name}</p>
      <button onclick="addToFavorites('${pokemon.name}')">Add to Favorites</button>
      <br> 
      <a href="pokemonDetails.html?pokemon=${pokemon.name}" target="_blank"><button>Know More</button></a>
  `;
  display.appendChild(pokemonElement);
}

function handleSearchClick() {
  var pokemonId = document.getElementById("search-input").value.trim();
  if (pokemonId) {
    fetchPokemonData(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId.toLowerCase()}`
    );
  } else {
    alert("Please enter a Pokemon ID or name.");
  }
}

function displayPokemonData(pokemon) {
  const display = document.getElementById("pokemon-display");
  display.innerHTML = ""; // Clear the display area
  addPokemonToDisplay(pokemon);
}