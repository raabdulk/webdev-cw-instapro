// Это компонент с функцией которая отрисовывает страницу добавления поста пользователя
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) { // добавляет новый пост

  let imageUrl = "";

  const render = () => {
    // это разметка формы добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
            <div class="upload=image">

              <label class="file-upload-label secondary-button">
                <input type="file" class="file-upload-input" style="display:none">
                  Выберите фото
              </label>
            </div>
          </div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4" id="textarea"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
    `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),// находит на странице div с классом header-container, вставляет разметку-->
      //из функции renderHeaderComponent 
    });

    const uploadImageContainer = appEl.querySelector(".file-upload-input"); 

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"), // передаем элемент в эту функцию, а функция отрендерит в этот элемент
        onImageUrlChange(newImageUrl) { // функция со ссылкой на загруженную картинку
          imageUrl = newImageUrl; // в локальную переменную записываем полученную ссылку
        },
      });
    }
    
    document.getElementById("add-button").addEventListener("click", () => { // при нажатии на кнопку добавить 
      let textArea = document.getElementById("textarea").value; // объявил переменную чтоб из value вытаскивать данные
      onAddPostClick({ // запускаем функцию со страницы index.js 
        description: textArea, // передаем текст написанный в теге textArea
        imageUrl: imageUrl, // передаем ссылку
      });
    });
  };

  render();
}