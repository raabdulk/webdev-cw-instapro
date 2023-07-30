// Здесь размещены функции которые работают с localStorage

export function saveUserToLocalStorage(user) { // Сохраняем данные в localStorage
  window.localStorage.setItem("user", JSON.stringify(user)); // Создаем ключ user и кладем в него свойство в формате JSON. 
}                                                            // JSON.stringify для преобразования объектов в JSON.

export function getUserFromLocalStorage(user) { // Считываем данные из localStorage для ключа user
  try {
    return JSON.parse(window.localStorage.getItem("user")); // получить данные по ключу user. 
  } catch (error) {                                         // JSON.parse для преобразования JSON обратно в объект.
    return null;
  }
}

export function removeUserFromLocalStorage(user) { // Удаляем данные из localStorage для ключа user
  window.localStorage.removeItem("user");  // удалить данные с ключом user
}
