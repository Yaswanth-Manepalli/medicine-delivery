// Sample medicine data
const medicines = [
    { name: "Paracetamol", price: 20 },
    { name: "Ibuprofen", price: 35 },
    { name: "Amoxicillin", price: 50 },
    { name: "Vitamin C", price: 15 },
    { name: "Cough Syrup", price: 60 },
    { name: "Antacid Tablets", price: 25 }
];

const medicineList = document.getElementById('medicine-list');
const searchInput = document.getElementById('search');
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
let cart = [];

// Function to display medicines
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

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
    });
    totalDisplay.textContent = total;
}

// Search functionality
searchInput.addEventListener('input', e => {
    displayMedicines(e.target.value);
});

// Checkout
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you! Your medicines will be delivered soon.");
        cart = [];
        updateCart();
    }
});

// Initial display
displayMedicines();
