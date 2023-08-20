import { goToPage, logout, user } from "../index.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";

export function renderHeaderComponent({ element }) { // Рендерит шапку страницы приложения
  // В зависимости от значения user в центре появляется/отсутствует кнопка + для добавлени поста и отрисовывается кнопка Выйти/Войти
  element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
        ${user ? `<div title="Добавить пост" class="add-post-sign"></div>` : "Войти"}
        </button>
        ${user ? `<button title="${user.name}" class="header-button logout-button">Выйти</button>` : ""}  
  </div>
`;
  // Ниже мы навешиваем обработчики на элементы
  element.querySelector(".add-or-login-button").addEventListener("click", () => { // Навешиваем обработчик на элемент с этим классом который будет -->
    if (user) { // при наличии объекта в константе user -->
      goToPage(ADD_POSTS_PAGE); // с помощью функции goToPage отправлять на сраницу добавления поста ADD_POSTS_PAGE -->
    } else { // иначе --> 
      goToPage(AUTH_PAGE); // с помощью функции отправляемся на страницу авторизации AUTH_PAGE
    }
  });

  element.querySelector(".logo").addEventListener("click", () => { // Установили обработчик для элемента с классом logo при нажатии на который -->
    goToPage(POSTS_PAGE); // с помощью функции мы отправляемся на страницу с постами всех пользователей
  });

  element.querySelector(".logout-button")?.addEventListener("click", logout); // Установили обработчик для элемента с классом logout-button -->
  // после нажатия на который произойдет выход пользователя из приложения с помощью запуска функции logout которая -->
  // которая занулит константу user, далее запустит функцию removeUserFromLocalStorage() и третьим шагом отправит нас на goToPage(POSTS_PAGE)
  return element;
}
