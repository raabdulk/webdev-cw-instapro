import { addPost, getPosts, getPostsUser } from "./api.js";
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
export let posts = []; // Массив с постами, сюда мы добавляем посты, отсюда мы их считываем

export const getToken = () => { // эта функция присваивает значение константе token
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
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE; // Если пользователь не авторизован, то отправляем его на авторизацию перед добавлением поста
      return renderApp();
    }

    if (newPage === POSTS_PAGE) { // если страница POSTS_PAGE то -->
      page = LOADING_PAGE; // переменная page получает значение LOADING_PAGE для запуска отображения Лоадера
      renderApp(); // функция отрисует лоадер который прописан в функции renderLoadingPageComponent
      

      return getPosts({ token: getToken() }) // далее получаем посты всех пользователей, параметром в функцию с fetch запросом передаем -->
        // ключ token со свойством которое вернет функция getToken
        .then((newPosts) => { // дожидаемся выполнения getPosts и принимаем в newPosts то что нам передаст функция с fetch запросом
          page = POSTS_PAGE; // переменная page получает значение POSTS_PAGE для отрисовки страницы с помощью renderApp
          posts = newPosts; // в переменную с постами кладем то что пришло из функции getPosts, а приходит к нам массив с объектами
          renderApp(); // происходит отрисовка страницы в зависимости от значения переменной page
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) { // если страница постов пользователя то -->
      page = LOADING_PAGE; // переменная page получает значение LOADING_PAGE для запуска отображения Лоадера
      renderApp(); // функция отрисует лоадер который прописан в функции renderLoadingPageComponent
      let dataUserId = data.userId;

      return getPostsUser({ token: getToken(), dataUserId })
        .then((newPosts) => {
          page = USER_POSTS_PAGE;
          posts = newPosts;
          renderApp();
          console.log("Открываю страницу пользователя: ", dataUserId);
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

const renderApp = () => { // В зависимости от значения переменной page возвращает соответствующую отрисовку
  const appEl = document.getElementById("app"); // константа с элементом app в который рендерится приложение

  if (page === LOADING_PAGE) { // если страница загрузки то -->
    return renderLoadingPageComponent({ // запускаем функцию лоадера и передаем в нее след. параметры
      appEl,    // даем доступ к элементу с id = "app" в который рендерится приложение
      user,     // даем доступ к переменной user, на данный момент ее значение null 
      goToPage, // передаем то что сейчас присвоено константе (функции)
    });
  }

  if (page === AUTH_PAGE) { // если страница авторизации то
    return renderAuthPageComponent({ // в функцию рендера страницы авторизации передаем следующие данные
      appEl, // appEl для отрисовки результата в div с классом app на index странице
      setUser: (newUser) => { // setUser, это свойства объекта аргумента, к которому мы присваиваем функцию
        // она будет выполняться когда внутри renderAuthPageComponent будет вызваться setUser('имя') 
        // setUser Это тоже callback, ты ее передаешь на 100-ой строке, и там же ее сразу описываешь, просто не записывая ее в переменную как goToPage
        user = newUser; // переменной user присваиваем значение параметра newUser
        saveUserToLocalStorage(user); // кладем значение user в localStorage, user в формате JSON
        goToPage(POSTS_PAGE); // отправляемся на страницу с постами
      },
      user, // для чего здесь user и какой функционал у setUser ???
      goToPage, // это функция переданная в качестве свойства объекта аргумента, это callback
    });
  }

  if (page === ADD_POSTS_PAGE) { // если страница добавления поста то
    return renderAddPostPageComponent({ // в функцию рендера добавления поста передаем след данные
      appEl, // appEl для отрисовки результата в div с классом app на index странице
      onAddPostClick({ description, imageUrl }) {
        // TODO: реализовать добавление поста в API
        addPost({ token: getToken(), description, imageUrl }) // запускаем и передаем в функцию addPost: token, description, imageUrl
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
    return renderPostsPageComponent({
      appEl,
    });
  }
};

goToPage(POSTS_PAGE);