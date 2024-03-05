// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

let nameProduct = document.querySelector('.name__product');
let reviewProduct = document.querySelector('.review');
let enterBtn = document.querySelector('.enter__btn');
let listProduct = document.querySelector('.list__product');
let showProducts = document.querySelector('.showProducts');

const renderReviewProductList = function() {
    let reviewsString = localStorage.getItem("reviews") || "[]";
    let reviews = JSON.parse(reviewsString);
    listProduct.textContent = "Продукты:\n";
    reviews.forEach(function(review) {
        let li =  document.createElement('li');
        let reviewLink = document.createElement('a');
        reviewLink.textContent = review.name;
        reviewLink.href = 'review.html';
        reviewLink.addEventListener('click', function(elem) {            
            localStorage.setItem("selectedProduct", elem.target.textContent); 
        });
        li.appendChild(reviewLink);
        listProduct.appendChild(li);
    });
};

const renderSelectedProductReviews = function() {
    let reviewsString = localStorage.getItem("reviews") || "[]";
    let reviews = JSON.parse(reviewsString);
    let selectedProduct = localStorage.getItem("selectedProduct");
    
    if (!!selectedProduct) {
        let productReviews = reviews.find(x => x.name === selectedProduct);
        if (!!productReviews) {
            let productReviewIndex = reviews.indexOf(productReviews);
            let currentProductReviews = productReviews.value;

            listProduct.textContent = "Отзывы по продукту " + productReviews.name + ":\n";
            currentProductReviews.forEach(function(review, index) {
                let li =  document.createElement('li');
                let liDel =  document.createElement('button');
                liDel.addEventListener('click',function() {
                    currentProductReviews.splice(index, 1);
                    reviews[productReviewIndex].value = currentProductReviews;
                    localStorage.setItem("reviews", JSON.stringify(reviews));
                    li.remove();
                    liDel.remove();
                });
                li.textContent = review;
                liDel.textContent = "Удалить";
                listProduct.appendChild(li);
                listProduct.appendChild(liDel);
            });
        }
    }
} 


if (location.pathname === '/review.html') {
    let selectedProduct = localStorage.getItem("selectedProduct");
    if (!!selectedProduct) {
        renderSelectedProductReviews();
    } else {
        renderReviewProductList(); 
    }
}

if (enterBtn) {
    enterBtn.addEventListener('click',function() {
        let reviewsString = localStorage.getItem("reviews") || "[]";
        let reviews = JSON.parse(reviewsString);
        let productReviews = reviews.find(x => x.name === nameProduct.value);
        if (!!productReviews) {
            let productIndex = reviews.indexOf(productReviews);
            productReviews.value.push(reviewProduct.value);
            reviews[productIndex] = productReviews;
        } else {
            let review = {"name": nameProduct.value, "value": [reviewProduct.value]};
            reviews.push(review);
        }
        
        localStorage.setItem("reviews", JSON.stringify(reviews));
        localStorage.setItem("selectedProduct", "");
        location.href = 'review.html';       
    });
}
if (showProducts) {
    showProducts.addEventListener('click',function() {
        localStorage.setItem("selectedProduct", "");
        location.href = 'review.html';       
    })
}










