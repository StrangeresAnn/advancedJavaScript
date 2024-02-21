// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class LibraryManagement {
    #listBooks = [];
    get listBooks() {
        return this.#listBooks;
    }
    addBook(title) {
        if (this.#listBooks.some(book => book == title)) throw new Error("Ошибка. Данная книга уже есть в списке");
        else this.#listBooks.push(title);
    }
    removeBook(title) {
        if (this.#listBooks.some(book => book == title)) this.#listBooks = this.#listBooks.filter(book => title !== book); 
        else throw new Error("Ошибка. Данной книги уже нет в списке");
    }
    hasBook(title) {
        return this.#listBooks.some(book => (book == title));
    }
    constructor(listBooks) {
        if (listBooks.length == new Set(listBooks).size) this.#listBooks = listBooks;
        else throw new Error("Ошибка. Данный список книг содержит дубликаты.");
    }
}
// const newList = new LibraryManagement(["Война и мир", "Горе от ума", "Мастер и Маргарита", "Горе от ума"]);
const newList = new LibraryManagement(["Война и мир", "Горе от ума", "Мастер и Маргарита"]);
newList.addBook("Юность");
console.log(newList.listBooks);
newList.removeBook("Мастер и Маргарита");
console.log(newList.listBooks);
// newList.removeBook("Мёртвые души");
console.log(newList.hasBook("Юность"));
console.log(newList.hasBook("Мастер и Маргарита"));


// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.


const initialData = [
{
product: "Apple iPhone 13",
reviews: [
{
id: "1",
text: "Отличный телефон! Батарея держится долго.",
},
{
id: "2",
text: "Камера супер, фото выглядят просто потрясающе.",
},
],
},
{
product: "Samsung Galaxy Z Fold 3",
reviews: [
{
id: "3",
text: "Интересный дизайн, но дорогой.",
},
],
},
{
product: "Sony PlayStation 5",
reviews: [
{
id: "4",
text: "Люблю играть на PS5, графика на высоте.",
},
],
},
];


const inputReviews = document.querySelector('.input-reviews');
const addReviews = document.querySelector('.add-reviews');
const reviews = document.querySelector('.reviews');
const errorMessage = document.querySelector('.error-message');

const arr = initialData.map(el => el.reviews.map(el => el.text));

arr.forEach(element => {
    let liReviews = document.createElement('li');
    liReviews.textContent = element;
    reviews.appendChild(liReviews);         
});

addReviews.addEventListener('click', () => {
    try {
        if (inputReviews.value.length < 50 || inputReviews.value.length > 500) {
            throw new Error("Ошибка, длинна введенного значения не соответствует требованию.")
        } else {
            let liReviews = document.createElement('li');
            liReviews.textContent = inputReviews.value;
            reviews.appendChild(liReviews);
            errorMessage.textContent = "";
        }
        
    } catch (error) {
        errorMessage.textContent = error.message;
    }
})

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.



