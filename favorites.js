document.addEventListener("DOMContentLoaded", function () {
  displayFavorites();
});

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
  const favList = document.getElementById("favorites-list");
  favList.innerHTML = ""; // Clear existing entries

  for (const name in favorites) {
    const favItem = document.createElement("div");
    favItem.innerHTML = `
          <p>${name} (${favorites[name]})</p>
          <button onclick="removeFromFavorites('${name}')">Remove from Favorites</button>
      `;
    favList.appendChild(favItem);
  }
}

function removeFromFavorites(name) {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites && favorites[name]) {
    delete favorites[name];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites(); // Refresh the list after removal
  }
}
