const facts = [
  "Медузы существуют дольше, чем динозавры — более 500 миллионов лет.",
  "У осьминога три сердца и синяя кровь.",
  "Земля — единственная планета в Солнечной системе, где не названа в честь бога.",
  "Самый старый рецепт на свете — это рецепт пива.",
  "Бананы излучают больше радиации, чем человек после рентгена (но это безопасно).",
  "Каждый год в мире производится около 5 триллионов пластиковых пакетов.",
  "Голубые глаза появились у человека всего 10 000 лет назад из-за мутации.",
  "Сердце у улитки бьётся в ноге.",
  "Человеческий мозг генерирует столько энергии, что может зажечь маленькую лампочку.",
  "Пингвины преданы своим партнёрам — более 90% пар воссоединяются после миграции.",
];

const factText = document.getElementById("fact-text");
const newFactBtn = document.getElementById("new-fact-btn");
const saveFactBtn = document.getElementById("save-fact-btn");
const goFavorites = document.getElementById("go-favorites");
const goBack = document.getElementById("go-back");
const mainScreen = document.getElementById("main-screen");
const favoritesScreen = document.getElementById("favorites-screen");
const favoritesList = document.getElementById("favorites-list");
const clearFavorites = document.getElementById("clear-favorites");

let currentFact = null;

function getFavorites() {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
}

function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  currentFact = facts[randomIndex];

  factText.classList.remove("fade");
  factText.offsetHeight;
  factText.textContent = currentFact;
  factText.classList.add("fade");

  updateSaveButton();
}

function updateSaveButton() {
  const favorites = getFavorites();
  const isSaved = currentFact && favorites.includes(currentFact);
  saveFactBtn.textContent = isSaved ? "✅ Уже в избранном" : "❤️ В избранное";
  saveFactBtn.disabled = isSaved || !currentFact;
}

saveFactBtn.addEventListener("click", () => {
  if (!currentFact) return;
  const favorites = getFavorites();
  if (!favorites.includes(currentFact)) {
    favorites.push(currentFact);
    saveFavorites(favorites);
    updateSaveButton();
    alert("Факт добавлен в избранное!");
  }
});

goFavorites.addEventListener("click", (e) => {
  e.preventDefault();
  mainScreen.classList.remove("active");
  favoritesScreen.classList.add("active");
  renderFavorites();
});

goBack.addEventListener("click", (e) => {
  e.preventDefault();
  favoritesScreen.classList.remove("active");
  mainScreen.classList.add("active");
});

clearFavorites.addEventListener("click", () => {
  if (confirm("Точно очистить всё?")) {
    saveFavorites([]);
    renderFavorites();
  }
});

function renderFavorites() {
  const favorites = getFavorites();
  favoritesList.innerHTML = "";
  if (favorites.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Пока нет избранных фактов.";
    favoritesList.appendChild(li);
    return;
  }

  favorites.forEach((fact) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${fact}</span>
      <button class="remove-btn" data-fact="${fact}">✕</button>
    `;
    favoritesList.appendChild(li);
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const factToRemove = e.target.dataset.fact;
      let favorites = getFavorites();
      favorites = favorites.filter((f) => f !== factToRemove);
      saveFavorites(favorites);
      renderFavorites();
    });
  });
}

newFactBtn.addEventListener("click", showRandomFact);

showRandomFact();
renderFavorites();
