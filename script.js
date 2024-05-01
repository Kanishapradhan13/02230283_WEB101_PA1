var favoritesCount = {}; // Object to keep track of the counts

function addToFavorites(pokemonName) {
  if (favoritesCount[pokemonName]) {
    favoritesCount[pokemonName]++; // Increase count if already added
  } else {
    favoritesCount[pokemonName] = 1; // Initialize count if not already added
  }

  updateFavoritesDisplay(); // Update the display with the new counts
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
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
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


function searchPokemon() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const searchBy = document.getElementById('searchBy').value;

  let filteredPokemon;
  if (searchBy === 'name') {
      filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(searchTerm));
  } else if (searchBy === 'type') {
      filteredPokemon = allPokemon.filter(pokemon => pokemon.types.some(type => type.type.name.includes(searchTerm)));
  } else if (searchBy === 'ability') {
      filteredPokemon = allPokemon.filter(pokemon => pokemon.abilities.some(ability => ability.ability.name.includes(searchTerm)));
  }

displayPokemonList(filteredPokemon);
}

async function openPokemonDetails(pokemonData) {
  const description = await getDescription(pokemonData.species.url);
  const detailsUrl = `details.html?name=${pokemonData.name}&image=${pokemonData.sprites.front_default}&weight=${pokemonData.weight}&height=${pokemonData.height}&types=${pokemonData.types.map(type => type.type.name).join(', ')}&description=${encodeURIComponent(description)}`;
  window.open(detailsUrl, '_blank');
}

async function getDescription(speciesUrl) {
  const response = await fetch(speciesUrl);
  const data = await response.json();
  const flavorText = data.flavor_text_entries.find(entry => entry.language.name === 'en');
  return flavorText ? flavorText.flavor_text : 'No description available.';
}

function createPokemonCard(pokemonData) {
  const card = document.createElement('div');
  card.classList.add('pokemonCard');
  card.addEventListener('click', () => openPokemonDetails(pokemonData));

  // ... (rest of the card creation code)
}


// fetchAllPokemon();