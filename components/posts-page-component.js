import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { addLikes, delLikes } from "../api.js";

export function renderPostsPageComponent({ appEl, postId }) {
  // функция перебирает массив posts, строит разметку на основе полученных данных -->
  // и полученную разметку кладем в appEl
  // TODO: реализовать рендер постов из api
  if (posts.length === 0) {
    console.log("Пусто!");
  } else {
    const appHtml = posts.map((post) => {
      return `
                    <li class="post">
                      <div class="post-header" data-user-id=${post.user.id}>
                          <img src=${
                            post.user.imageUrl
                          } class="post-header__user-image">
                          <p class="post-header__user-name">${
                            post.user.name
                          }</p>
                      </div>
                      <div class="post-image-container">
                        <img class="post-image" src=${post.imageUrl}>
                      </div>
                      <div class="post-likes">
                        <button data-post-id="${post.id}" class="like-button">
                          ${
                            post.isLiked
                              ? `<img src="./assets/images/like-active.svg"></img>`
                              : `<img src="./assets/images/like-not-active.svg"></img>`
                          }                 
                        </button>
                        <p class="post-likes-text">
                          Нравится: <strong>${post.user.name}</strong>
                        </p>
                      </div>
                      <p class="post-text">
                        <span class="user-name">${post.user.name}</span>
                        ${post.description}
                      </p>
                      <p class="post-date">
                        19 минут назад
                      </p>
                    </li>`;
    });

    const containerHtml = `
    <div class="page-container">
      <div class="header-container"></div>
        <ul class="posts">
          <!-- Список рендерится из JS -->
          ${appHtml}
        </ul>
    </div>
    `;

    // console.log("Содержимое appHtml:", appHtml);
    console.log("Актуальный список постов:", posts);

    /**
     * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
     * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
     */

    appEl.innerHTML = containerHtml;
    initLikeButton();

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    for (let userEl of document.querySelectorAll(".post-header")) {
      // для содержимого объекта с классом post-header
      userEl.addEventListener("click", () => {
        // навешиваем событие по клику
        goToPage(USER_POSTS_PAGE, {
          // которое отправляет на страницу с постами пользователя
          userId: userEl.dataset.userId, // data-user-id которого содержит userId элемента по которому мы кликнули
        });
      });
    }
  }
}

// Закрашиваем кнопку лайка
const initLikeButton = () => {
  const likeButtons = document.querySelectorAll(".like-button"); // выбрали все элементы с классом like-button, на него вешаем обработчики клика

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      const postId = likeButton.dataset.postId;
      let indexOfEl;
      let isLikedEl;
      const apple = posts.find((item, index) => {
        if (item.id === postId) {
          indexOfEl = index;
          isLikedEl = item.isLiked;
          return item;
        }
      });
      if (isLikedEl) {
        delLikes({ postId });
      } else {
        addLikes({ postId });
      }

      let appEl = document.querySelector("#app");
      renderPostsPageComponent({ appEl, postId });
    });
  }
};
