import { loginUser, registerUser } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAuthPageComponent({ appEl, setUser }) { // Функция авторизации
  let isLoginMode = true;
  let imageUrl = "";

  const renderForm = () => {
    const appHtml = `
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">${isLoginMode ? "Вход в&nbsp;Instapro" : "Регистрация в&nbsp;Instapro"}</h3>
              <div class="form-inputs">${!isLoginMode ? `
                      <div class="upload-image-container"></div>
                      <input type="text" id="name-input" class="input" placeholder="Имя" />
                      ` : ""}
                  
                  <input type="text" id="login-input" class="input" placeholder="Логин" />
                  <input type="password" id="password-input" class="input" placeholder="Пароль" />
                  
                  <div class="form-error"></div>
                  
                  <button class="button" id="login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
              </div>
            
              <div class="form-footer">
                <p class="form-footer-title">${isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                  <button class="link-button" id="toggle-button">${isLoginMode ? "Зарегистрироваться." : "Войти."}
                  </button>
                </p> 
              </div>
          </div>
      </div>`;

    appEl.innerHTML = appHtml;

    // Не вызываем перерендер, чтобы не сбрасывалась заполненная форма
    // Точечно обновляем кусочек дом дерева
    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    renderHeaderComponent({ // Рендерит шапку в зависимости от значения переменной user меняется шапка
      element: document.querySelector(".header-container"), // передаем элемент в функцию, в этот элемент функция рендерит шапку
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"), // передаем элемент в эту функцию, а функция отрендерит в этот элемент
        onImageUrlChange(newImageUrl) { // функция со ссылкой на загруженную картинку
          imageUrl = newImageUrl; // в локальную переменную записываем полученную ссылку
        },
      });
    }

    document.getElementById("login-button").addEventListener("click", () => { // вешаем обработчик на кнопку Войти
      setError("");

      if (isLoginMode) {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        loginUser({
          login: login,
          password: password,
        })
          .then((user) => {
            setUser(user.user);
          })
          .catch((error) => {
            console.warn(error);
            setError(error.message);
          });
      } else {
        const login = document.getElementById("login-input").value;
        const name = document.getElementById("name-input").value;
        const password = document.getElementById("password-input").value;
        if (!name) {
          alert("Введите имя");
          return;
        }
        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        if (!imageUrl) { // проверка выбрано ли фото, при выбранном фото imageUrl будет иметь ссылку
          alert("Не выбрана фотография");
          return;
        }

        registerUser({
          login: login,
          password: password,
          name: name,
          imageUrl,
        })
          .then((user) => {
            setUser(user.user);
          })
          .catch((error) => {
            console.warn(error);
            setError(error.message);
          });
      }
    });

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };

  renderForm();
}
