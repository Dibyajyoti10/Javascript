document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "product 1", price: 39.99 },
        { id: 2, name: "product 2", price: 48.48 },
        { id: 3, name: "product 3", price: 12.12 },
    ];

    const cart = [];
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartTotalMsg = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total"); // Corrected element ID
    const checkOutBtn = document.getElementById("checkout-btn");

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add TO Cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        console.log(cart);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMsg.classList.add("hidden");
            cartTotalMsg.classList.remove("hidden");

            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                `;
                cartItems.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMsg.classList.remove("hidden");
            cartTotalMsg.classList.add("hidden");
        }
    }

    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert("Check out successful");
        renderCart();
    });

    renderCart();
});