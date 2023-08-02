// Здесь размещены функции которые работают с localStorage

export function saveUserToLocalStorage(user) { // Сохраняем данные в localStorage
  console.log(user);
  window.localStorage.setItem("user", JSON.stringify(user)); // Создаем ключ user и кладем в него свойство в формате JSON. 
}                                                            // JSON.stringify для преобразования объектов в JSON.

export function getUserFromLocalStorage(user) { // Считываем данные из localStorage для ключа user
  try { // запускаем проверку на JSON или !JSON. Должна приходить JSON строчка
    console.log(user);
    return JSON.parse(window.localStorage.getItem("user")); // с помощью JSON.parse парсим JSON строчку обратно в объект.
  } catch (error) { // если в параметре user пришла не JSON строка, то кидаем ошибку
    return null; // и возвращаем null
  }
}

export function removeUserFromLocalStorage(user) { // Удаляем данные из localStorage для ключа user
  console.log(user);
  window.localStorage.removeItem("user");  // удалить данные с ключом user
}
