import { getPosts } from "./api.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "./routes.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";
import { renderLoadingPageComponent } from "./components/loading-page-component.js";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "./helpers.js";

export let user = getUserFromLocalStorage(); // Получаем объект из функции и кладем объект в переменную user 
export let page = null; // Создаем переменную page и сразу же присваеваем ей значение null
export let posts = []; // Массив с комментами, сюда мы добавляем комменты, отсюда мы их считываем

const getToken = () => { // эта функция присваивает значение константе token
  const token = user ? `Bearer ${user.token}` : undefined; // если константа user содержит объект, то получаем из обекта токен с помощью user.token
  return token; // исходя из тернарного оператора выше возвращает значение константы либо Bearer ${user.token} либо undefined
};

export const logout = () => { // Функция выхода из приложения авторизованного пользователя
  user = null; // зануляем константу user 
  removeUserFromLocalStorage(); // Удаляем данные из localStorage
  goToPage(POSTS_PAGE); // отправляемся с помощью функции goToPage на страницу POSTS_PAGE
};

// Включает страницу приложения
export const goToPage = (newPage, data) => { // с этой функции начинает работать наше приложение
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      // Если пользователь не авторизован, то отправляем его на авторизацию перед добавлением поста
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts({ token: getToken() })
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      // TODO: реализовать получение постов юзера из API
      console.log("Открываю страницу пользователя: ", data.userId);
      page = USER_POSTS_PAGE;
      posts = [];
      return renderApp();
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

const renderApp = () => { // В зависимости от значения переменной page возвращает соответствующую отрисовку
  const appEl = document.getElementById("app");
  if (page === LOADING_PAGE) { // если страница загрузки то -->
    return renderLoadingPageComponent({ // запускаем функцию лоадера
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) { // если страница авторизации то
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        user = newUser;
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) { // если страница добавления поста то
    return renderAddPostPageComponent({
      appEl,
      onAddPostClick({ description, imageUrl }) {
        // TODO: реализовать добавление поста в API
        console.log("Добавляю пост...", { description, imageUrl });
        goToPage(POSTS_PAGE);
      },
    });
  }

  if (page === POSTS_PAGE) { // если страница всех постов то
    return renderPostsPageComponent({
      appEl,
    });
  }

  if (page === USER_POSTS_PAGE) { // если страница постов пользователя то
    // TODO: реализовать страницу фотографию пользвателя
    appEl.innerHTML = "Здесь будет страница фотографий пользователя";
    return;
  }
};

goToPage(POSTS_PAGE);
