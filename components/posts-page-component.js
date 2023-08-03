import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) { // функция перебирает массив posts, строит разметку на основе полученных данных -->
  // и полученную разметку кладем в appEl
  // TODO: реализовать рендер постов из api
  if (posts.length === 0) {

    console.log("Пусто!")
    
  } else {
    const appHtml = posts.map((post) => {
      return `
                <div class="page-container">
                  <div class="header-container"></div>
                  <ul class="posts">
  
                    <li class="post">
                      <div class="post-header" data-user-id=${post.user.id}>
                          <img src=${post.user.imageUrl} class="post-header__user-image">
                          <p class="post-header__user-name">${post.user.name}</p>
                      </div>
                      <div class="post-image-container">
                        <img class="post-image" src=${post.imageUrl}>
                      </div>
                      <div class="post-likes">
                        <button data-post-id=${post.id} class="like-button">
                          <img src="./assets/images/like-active.svg">
                        </button>
                        <p class="post-likes-text">
                          Нравится: <strong>${post.likes}</strong>
                        </p>
                      </div>
                      <p class="post-text">
                        <span class="user-name">Иван Иваныч</span>
                        Ромашка, ромашка...
                      </p>
                      <p class="post-date">
                        19 минут назад
                      </p>
                    </li>
  
                  </ul>
                </div>`;
    })

    console.log("Содержимое appHtml:", appHtml);
    console.log("Актуальный список постов:", posts);

    /**
     * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
     * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
     */

    // appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    for (let userEl of document.querySelectorAll(".post-header")) { // для содержимого объекта с классом post-header
      userEl.addEventListener("click", () => { // навешиваем событие по клику
        goToPage(USER_POSTS_PAGE, { // которое отправляет на страницу с постами пользователя
          userId: userEl.dataset.userId, // data-user-id которого содержит userId элемента по которому мы кликнули
        });
      });
    }
  }

}

