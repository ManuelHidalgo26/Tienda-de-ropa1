document.addEventListener('DOMContentLoaded', function() {
    const cart = [];

    window.addToCart = function(productName, productPrice) {
        const product = { name: productName, price: productPrice };
        cart.push(product);
        renderCart();
        showNotification(`"${productName}" ha sido añadido al carrito.`);
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        renderCart();
    };

    window.toggleCart = function() {
        const cartContainer = document.getElementById('cart');
        cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
    };

    window.finalizePurchase = function() {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        alert('Compra finalizada.');
        cart.length = 0;
        renderCart();
    };

    window.clearCart = function() {
        if (cart.length === 0) {
            alert('El carrito ya está vacío.');
            return;
        }

        cart.length = 0;
        renderCart();
        alert('El carrito ha sido vaciado.');
    };

    function renderCart() {
        const cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = ''; // Limpiar el contenido actual del carrito

        const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <span>${product.name} - $${product.price}</span>
                <button class="btn btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartContainer.appendChild(productElement);
        });

        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Total: $${totalPrice}`;
        cartContainer.appendChild(totalPriceElement);

        // Agregar botones "Finalizar compra" y "Vaciar carrito"
        const finalizePurchaseButton = document.createElement('button');
        finalizePurchaseButton.textContent = 'Finalizar compra';
        finalizePurchaseButton.classList.add('btn', 'btn-success');
        finalizePurchaseButton.onclick = finalizePurchase;
        cartContainer.appendChild(finalizePurchaseButton);

        const clearCartButton = document.createElement('button');
        clearCartButton.textContent = 'Vaciar carrito';
        clearCartButton.classList.add('btn', 'btn-danger', 'ms-2');
        clearCartButton.onclick = clearCart;
        cartContainer.appendChild(clearCartButton);
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.textContent = '';
            notification.style.display = 'none';
        }, 3000);
    }
});
