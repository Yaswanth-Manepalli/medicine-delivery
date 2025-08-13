const medicines = [
    { name: "Paracetamol", price: 20 },
    { name: "Ibuprofen", price: 35 },
    { name: "Amoxicillin", price: 50 },
    { name: "Vitamin C", price: 15 },
    { name: "Cough Syrup", price: 60 },
    { name: "Antacid Tablets", price: 25 },
    { name: "Insulin", price: 400 },
    { name: "Pain Relief Gel", price: 120 }
];

const medicineList = document.getElementById('medicine-list');
const searchInput = document.getElementById('search');
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
let cart = [];

// Display medicines
function displayMedicines(filter = "") {
    medicineList.innerHTML = "";
    medicines
        .filter(med => med.name.toLowerCase().includes(filter.toLowerCase()))
        .forEach(med => {
            const div = document.createElement('div');
            div.className = "medicine";
            div.innerHTML = `
                <h3>${med.name}</h3>
                <p>₹${med.price}</p>
                <button onclick="addToCart('${med.name}', ${med.price})">Add to Cart</button>
            `;
            medicineList.appendChild(div);
        });
}

// Add to cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update cart UI
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button class="remove-btn" onclick="removeFromCart(${index})">✖</button>
        `;
        cartItems.appendChild(li);
    });
    totalDisplay.textContent = total;
}

// Search
searchInput.addEventListener('input', e => {
    displayMedicines(e.target.value);
});

// Checkout
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("✅ Thank you! Your medicines will be delivered soon.");
        cart = [];
        updateCart();
    }
});

// Initial render
displayMedicines();
