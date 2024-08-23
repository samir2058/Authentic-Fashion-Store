document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnlogin-popup');
    const iconClose = document.querySelector('.icon-close');
    
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');

    // Registration Form Submission
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showMessage('registerMessage', 'Passwords do not match.');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            showMessage('registerMessage', 'User already exists.');
        } else {
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            showMessage('registerMessage', 'Registration successful. Redirecting to login...');
            setTimeout(() => {
                wrapper.classList.remove('active');
                showMessage('registerMessage', '');
            }, 2000);
        }
    });

    // Login Form Submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            showMessage('loginMessage', 'Login successful.');
        } else {
            showMessage('loginMessage', 'Invalid email or password.');
        }
    });

    // Register and Login Links
    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });

    // Popup and Close Icon
    btnPopup.addEventListener('click', () => {
        wrapper.classList.toggle('active-popup');
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.toggle('active-popup');
    });

    // Cookie Banner
    const cookiesBtn = document.querySelector("#cookies-btn");
    const cookiesBanner = document.querySelector("#cookies");

    cookiesBtn.addEventListener("click", () => {
        cookiesBanner.style.display = "none";
        setCookie("cookie", true, 30);
    });

    window.addEventListener("load", displayCookieMessage);

    function setCookie(cName, cValue, expDays) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }

    function getCookie(cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie);
        const cArr = cDecoded.split("; ");
        let value;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) value = val.substring(name.length);
        });
        return value;
    }

    function displayCookieMessage() {
        if (!getCookie("cookie")) {
            document.querySelector("#cookies").style.display = "block";
        }
    }

    // Show messages
    function showMessage(elementId, message) {
        const messageElement = document.getElementById(elementId);
        messageElement.textContent = message;
        setTimeout(() => messageElement.textContent = '', 3000);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const buyButtons = document.querySelectorAll('.buy-btn');
    const shoppingBagButton = document.querySelector('.shopping-bag-btn');
    const shoppingBagContent = document.getElementById('shopping-bag-content');
    const cartItems = document.getElementById('cart-items');
    const itemCount = document.getElementById('item-count');
    const checkoutButton = document.querySelector('.checkout-btn');

    let cart = [];

    buyButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            addToCart(index);
        });
    });

    shoppingBagButton.addEventListener('click', function () {
        shoppingBagContent.style.display = shoppingBagContent.style.display === 'block' ? 'none' : 'block';
    });

    checkoutButton.addEventListener('click', function () {
        if (cart.length > 0) {
            alert('Thank you for buying! Visit us again.');
            clearCart();
        } else {
            alert('Your cart is empty.');
        }
    });

    function addToCart(productIndex) {
        const productCard = buyButtons[productIndex].closest('.product-card');
        const productName = productCard.querySelector('h3').innerText;
        const productPrice = productCard.querySelector('p').innerText;
        
        const product = { name: productName, price: productPrice, id: Date.now() };
        cart.push(product);
        updateCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        cart.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} <span>${item.price}</span>`;
            
            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remove';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => removeFromCart(item.id));
            
            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });

        itemCount.innerText = cart.length;
    }

    function clearCart() {
        cart = [];
        updateCart();
        shoppingBagContent.style.display = 'none';
    }
});















