// Функция показывающая значок лоадера
import { renderHeaderComponent } from "./header-component.js";

export function renderLoadingPageComponent({ appEl, user, goToPage }) { // Лоадер
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="loading-page">
                  <div class="loader"><div></div><div></div><div></div></div>
                </div>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({ // Запускает рендер функцию шапки страницы приложения
    user, // принимаем значение в функцию для рендера хэдера
    element: document.querySelector(".header-container"), // Передаем в функцию разметку элемента с классом header-container
    goToPage, // Этот параметр отвечает за кнопку Войти и Выйти
  });
}
