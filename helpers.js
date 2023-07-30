export function saveUserToLocalStorage(user) { // Сохраняем данные в localStorage
  window.localStorage.setItem("user", JSON.stringify(user)); // ???
}

export function getUserFromLocalStorage(user) { // Считываем данные из localStorage для ключа user
  try {
    return JSON.parse(window.localStorage.getItem("user")); // получить данные по ключу user
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) { // Удаляем данные из localStorage для ключа user
  window.localStorage.removeItem("user");  // удалить данные с ключом user
}
