// utils/storage.js
const FAVORITES_KEY = "favorite_books";

export function getFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function addFavorite(book) {
  const favorites = getFavorites();
  if (!favorites.some((b) => b.key === book.key)) {
    favorites.push(book);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(key) {
  const favorites = getFavorites().filter((b) => b.key !== key);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
