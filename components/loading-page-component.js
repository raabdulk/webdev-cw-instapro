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
    user, // передаем или принимаем ??? в функцию параметр переменной user
    element: document.querySelector(".header-container"), // Передаем или принимаем ??? в функцию разметку элемента с классом header-container
    goToPage, // ЧТо выполняет этот параметр ??? 
  });
}
