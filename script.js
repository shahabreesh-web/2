// =====================
// Product Data
// =====================
const products = [
    {
        id: 1,
        name: "Samsung Galaxy A14 স্মার্টফোন 6GB/128GB",
        price: 15999,
        originalPrice: 18999,
        discount: 16,
        category: "electronics",
        emoji: "📱",
        rating: 4.5
    },
    {
        id: 2,
        name: "Xiaomi Redmi Note 12 Pro 5G",
        price: 26999,
        originalPrice: 32999,
        discount: 18,
        category: "electronics",
        emoji: "📱",
        rating: 4.7
    },
    {
        id: 3,
        name: "HP Laptop 15s Intel Core i5 12th Gen",
        price: 58999,
        originalPrice: 72000,
        discount: 18,
        category: "laptop",
        emoji: "💻",
        rating: 4.6
    },
    {
        id: 4,
        name: "Dell Inspiron 15 Intel Core i3",
        price: 44999,
        originalPrice: 55000,
        discount: 18,
        category: "laptop",
        emoji: "💻",
        rating: 4.4
    },
    {
        id: 5,
        name: "Panjabi Premium Quality - সাদা",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        category: "clothing",
        emoji: "👕",
        rating: 4.3
    },
    {
        id: 6,
        name: "Casual Shirt - সবুজ রং",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        category: "clothing",
        emoji: "👕",
        rating: 4.2
    },
    {
        id: 7,
        name: "Nike Running Shoes - কালো",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        category: "shoes",
        emoji: "👟",
        rating: 4.8
    },
    {
        id: 8,
        name: "Bata Formal Shoes - বাদামী",
        price: 2299,
        originalPrice: 2999,
        discount: 23,
        category: "shoes",
        emoji: "👞",
        rating: 4.5
    },
    {
        id: 9,
        name: "Garnier Bright Complete Serum",
        price: 650,
        originalPrice: 850,
        discount: 24,
        category: "beauty",
        emoji: "💄",
        rating: 4.4
    },
    {
        id: 10,
        name: "L'Oreal Revitalift Cream",
        price: 890,
        originalPrice: 1100,
        discount: 19,
        category: "beauty",
        emoji: "🧴",
        rating: 4.6
    },
    {
        id: 11,
        name: "Apple iPhone 14 Pro Max",
        price: 145999,
        originalPrice: 159999,
        discount: 9,
        category: "electronics",
        emoji: "📱",
        rating: 4.9
    },
    {
        id: 12,
        name: "Lenovo ThinkPad Intel Core i5",
        price: 65999,
        originalPrice: 85000,
        discount: 22,
        category: "laptop",
        emoji: "💻",
        rating: 4.7
    }
];

let cart = [];

// =====================
// Initialize
// =====================
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
});

// =====================
// Display Products
// =====================
function displayProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-rating">${getRatingStars(product.rating)}</div>
                    <div>
                        <span class="product-price">৳${product.price.toLocaleString()}</span>
                        <span class="product-original-price">৳${product.originalPrice.toLocaleString()}</span>
                        <span class="product-discount">-${product.discount}%</span>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        🛒 কার্টে যোগ করুন
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML;
    });
}

// =====================
// Get Rating Stars
// =====================
function getRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '⭐';
    }
    return stars + ` (${rating})`;
}

// =====================
// Search Products
// =====================
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// =====================
// Filter by Category
// =====================
function filterCategory(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => 
            product.category === category
        );
        displayProducts(filteredProducts);
    }
}

// =====================
// Add to Cart
// =====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    alert(`${product.name} কার্টে যোগ হয়েছে! 🛒`);
}

// =====================
// Update Cart Count
// =====================
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// =====================
// Show Cart
// =====================
function showCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
    displayCartItems();
}

// =====================
// Close Cart
// =====================
function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
}

// =====================
// Display Cart Items
// =====================
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center;padding:40px;">আপনার কার্ট খালি! 🛒</p>';
        totalPriceElement.textContent = '0';
        return;
    }
    
    let cartHTML = '';
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.emoji} ${item.name}</div>
                    <div class="cart-item-price">৳${item.price.toLocaleString()} × ${item.quantity} = ৳${itemTotal.toLocaleString()}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">✕ মুছুন</button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    totalPriceElement.textContent = totalPrice.toLocaleString();
}

// =====================
// Remove from Cart
// =====================
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
}

// =====================
// Checkout
// =====================
function checkout() {
    if (cart.length === 0) {
        alert('আপনার কার্ট খালি! প্রথমে পণ্য যোগ করুন।');
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const confirmOrder = confirm(`মোট: ৳${totalPrice.toLocaleString()}\n\nআপনি কি অর্ডার নিশ্চিত করতে চান?`);
    
    if (confirmOrder) {
        alert('🎉 অর্ডার সফলভাবে হয়েছে!\n\nআমাদের সাথে থাকার জন্য ধন্যবাদ!');
        cart = [];
        updateCartCount();
        closeCart();
    }
}

// =====================
// Login Modal
// =====================
function showLogin() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
}

function closeLogin() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    alert('আপনি সফলভাবে লগইন করেছেন! 🎉');
    closeLogin();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    const loginModal = document.getElementById('loginModal');
    
    if (event.target === cartModal) {
        closeCart();
    }
    if (event.target === loginModal) {
        closeLogin();
    }
}
