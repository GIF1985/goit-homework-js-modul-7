// Импортируем массив объектов с данными о картинках
import { galleryItems } from "./gallery-items.js";

// Находим элемент галереи на странице
const galleryRef = document.querySelector(".gallery");

// Создаем HTML-разметку для каждого элемента галереи
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

// Добавляем HTML-разметку в элемент галереи
galleryRef.insertAdjacentHTML("beforeend", galleryItemsMarkup);

// Функция для создания HTML-разметки для каждого элемента галереи
function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      //элементы галереи
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
        </a>
      </li>
    `;
    })
    .join("");
}

// Добавляем обработчик клика на элементы галереи
galleryRef.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  const target = event.target;

  // Проверяем, что клик был произведен на элементе img
  if (target.nodeName !== "IMG") {
    return;
  }

  // Получаем URL большого изображения из атрибута data-source
  const largeImageURL = target.dataset.source;

  //     const instance = basicLightbox.create(`
  //     <img src="assets/images/image.png" width="800" height="600">
  // `);

  //     instance.show();

  // Создаем экземпляр модального окна с большим изображением и с заменной значения атрибута src
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
`);

  // Открываем модальное окно с большим изображением
  instance.show();

  // Запрещаем перенаправление на другую страницу при клике на изображение
  const link = instance.element().querySelector("img");
  link.addEventListener("click", (event) => event.preventDefault());

  // Добавляем обработчик события нажатия на клавишу Escape
  const handleKeyPress = (event) => {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", handleKeyPress);
    }
  };
  document.addEventListener("keydown", handleKeyPress);
}

console.log(galleryItems);
