// Замени на свой, чтобы получить независимый от других набор данных
// "боевая" версия инстапро лежит в ключе prod

const personalKey = "rashid-abdulkhamidov";  // Персональный ключ разработчика rashid-abdulkhamidov 
const baseHost = `https://wedev-api.sky.pro`; // Получить посты всех пользователей 
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`; // https://wedev-api.sky.pro/api/v1/rashid-abdulkhamidov/instapro/api/v1/rashid-abdulkhamidov/instapro

export function getPosts({ token }) { // Получаем все посты пользователей
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function getPostsUser({ token, dataUserId }) { // Получаем  посты пользователя
  return fetch(postsHost + '/user-posts/' + dataUserId, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function addPost({ token, description, imageUrl }) { // Добавляем пост
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    }),

  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function addLikes({ token, postId }) { // Добавляем лайк
  return fetch(postsHost + '/' + postId + '/like', {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function delLikes({ token, postId }) { // Удаляем лайк
  return fetch(postsHost + '/' + postId + '/dislike', {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}


// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) { // Регистрация пользователя
  return fetch(baseHost + "/api/user", { // https://wedev-api.sky.pro/api/v1/rashid-abdulkhamidov/instapro/api/user
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) { // Авторизация пользователя
  return fetch(baseHost + "/api/user/login", { // https://wedev-api.sky.pro/api/v1/rashid-abdulkhamidov/instapro/api/user/login
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}
