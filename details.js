document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get("pokemon");
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      displayPokemonDetails(data);
    })
    .catch((error) => console.error("Failed to fetch Pokémon details:", error));
});

function displayPokemonDetails(pokemon) {
  const pokemonInfo = document.getElementById("pokemon-info");
  pokemonInfo.innerHTML = `
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Types: ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
        <p>Abilities: ${pokemon.abilities
          .map((ability) => ability.ability.name)
          .join(", ")}</p>
    `;
}
