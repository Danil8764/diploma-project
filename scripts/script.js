// Функция для обновления количества товаров в корзине
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Функция для расчета общей суммы заказа
function calculateTotalAmount(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Функция для отображения QR-кода
function displayQRCode() {
    const paymentResult = document.getElementById('payment-result');
    if (paymentResult) {
        paymentResult.innerHTML = `
            <img src="images/QR.jpg" alt="QR Code for Payment" class="qr-code">
            <p>Отсканируйте QR-код для оплаты.</p>
        `;
    }
}

// Функция для отображения сообщения об оплате при получении
function displayCashPaymentMessage() {
    const paymentResult = document.getElementById('payment-result');
    if (paymentResult) {
        paymentResult.innerHTML = `
            <p>Оплата будет произведена при получении товара.</p>
        `;
    }
}

// Функция для обработки оплаты
function handlePayment() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    if (paymentMethod === 'qr') {
        displayQRCode(); // Отображаем QR-код
    } else if (paymentMethod === 'cash') {
        displayCashPaymentMessage(); // Отображаем сообщение об оплате при получении
    }
}

// Функция для отображения товаров в корзине
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваша корзина пуста.</p>';
    } else {
        cartItemsContainer.innerHTML = ''; // Очищаем контейнер
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <div class="cart-item-controls">
                    <p>Количество: ${item.quantity}</p>
                    <p class="cart-item-price">Цена: ${item.price * item.quantity} руб.</p>
                    <button class="remove-button" onclick="removeItem(${index})">Удалить</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Добавляем общую сумму заказа
        const totalAmount = calculateTotalAmount(cart);
        const totalAmountElement = document.getElementById('total-amount-value');
        if (totalAmountElement) {
            totalAmountElement.textContent = totalAmount;
        }
    }
}

// Функция для удаления товара из корзины
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Удаляем товар из корзины
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар удален из корзины!');
    displayCartItems(); // Обновляем отображение корзины
    updateCartCount(); // Обновляем количество товаров в корзине
}

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    displayCartItems(); // Отображаем товары в корзине
    updateCartCount(); // Обновляем количество товаров в корзине
});
