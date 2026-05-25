// ============ PRODUCT DATA ============
const products = [
    { id: 1, name: "Samsung Galaxy A14 স্মার্টফোন 6GB/128GB", price: 15999, originalPrice: 18999, discount: 16, category: "electronics", emoji: "📱", rating: 4.5, reviews: 234, sold: 1250, isDeal: false },
    { id: 2, name: "Xiaomi Redmi Note 12 Pro 5G", price: 26999, originalPrice: 32999, discount: 18, category: "electronics", emoji: "📱", rating: 4.7, reviews: 567, sold: 2340, isDeal: true },
    { id: 3, name: "HP Laptop 15s Intel Core i5", price: 58999, originalPrice: 72000, discount: 18, category: "laptop", emoji: "💻", rating: 4.6, reviews: 189, sold: 890, isDeal: false },
    { id: 4, name: "Dell Inspiron 15 Intel Core i3", price: 44999, originalPrice: 55000, discount: 18, category: "laptop", emoji: "💻", rating: 4.4, reviews: 145, sold: 567, isDeal: false },
    { id: 5, name: "Panjabi Premium Quality - সাদা", price: 1299, originalPrice: 1999, discount: 35, category: "clothing", emoji: "👕", rating: 4.3, reviews: 890, sold: 4500, isDeal: true },
    { id: 6, name: "Casual Shirt - সবুজ", price: 899, originalPrice: 1299, discount: 31, category: "clothing", emoji: "👕", rating: 4.2, reviews: 234, sold: 2100, isDeal: false },
    { id: 7, name: "Nike Running Shoes - কালো", price: 3499, originalPrice: 4999, discount: 30, category: "shoes", emoji: "👟", rating: 4.8, reviews: 567, sold: 3200, isDeal: true },
    { id: 8, name: "Bata Formal Shoes - বাদামী", price: 2299, originalPrice: 2999, discount: 23, category: "shoes", emoji: "👞", rating: 4.5, reviews: 345, sold: 1800, isDeal: false },
    { id: 9, name: "Garnier Bright Complete Serum", price: 650, originalPrice: 850, discount: 24, category: "beauty", emoji: "💄", rating: 4.4, reviews: 678, sold: 5600, isDeal: true },
    { id: 10, name: "L'Oreal Revitalift Cream", price: 890, originalPrice: 1100, discount: 19, category: "beauty", emoji: "🧴", rating: 4.6, reviews: 456, sold: 3400, isDeal: false }
];

// ============ VARIABLES ============
let cart = [];
let wishlist = [];
let currentSlide = 0;

// Slider Data
const slides = [
    { emoji: "🎉", text: "৫০% ছাড় - সব মোবাইলে!", bg: "linear-gradient(135deg, #ff6b6b, #ee5a24)" },
    { emoji: "🚀", text: "নতুন ল্যাপটপ কালেকশন", bg: "linear-gradient(135deg, #667eea, #764ba2)" },
    { emoji: "💄", text: "বিউটি প্রোডাক্টে ৩০% ছাড়", bg: "linear-gradient(135deg, #11998e, #38ef7d)" }
];

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    displaySlides();
    displayDeals();
    updateWishlistCount();
});

// ============ SLIDER FUNCTIONS ============
function displaySlides() {
    const sliderContainer = document.getElementById('sliderContainer');
    if (!sliderContainer) return;
    
    sliderContainer.style.background = slides[0].bg;
    sliderContainer.innerHTML = `
        <div class="slider-content">
            <div class="slider-emoji">${slides[0].emoji}</div>
            <h1>${slides[0].text}</h1>
            <button class="slider-btn">এখনই কিনুন</button>
        </div>
        <button class="slider-nav prev" onclick="changeSlide(-1)">❮</button>
        <button class="slider-nav next" onclick="changeSlide(1)">❯</button>
    `;
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    const sliderContainer = document.getElementById('sliderContainer');
    sliderContainer.style.background = slides[currentSlide].bg;
    sliderContainer.innerHTML = `
        <div class="slider-content">
            <div class="slider-emoji">${slides[currentSlide].emoji}</div>
            <h1>${slides[currentSlide].text}</h1>
            <button class="slider-btn">এখনই কিনুন</button>
        </div>
        <button class="slider-nav prev" onclick="changeSlide(-1)">❮</button>
        <button class="slider-nav next" onclick="changeSlide(1)">❯</button>
    `;
}

// ============ DEALS SECTION ============
function displayDeals() {
    const dealGrid = document.getElementById('dealGrid');
    if (!dealGrid) return;
    
    const deals = products.filter(p => p.isDeal);
    let dealsHTML = '';
    
    deals.forEach(product => {
        dealsHTML += `
            <div class="product-card">
                <div class="product-image">${product.emoji}</div>
                <div class="product-badge">🔥 ডিল</div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-rating">${getStars(product.rating)} (${product.reviews})</div>
                    <div>
                        <span class="product-price">৳${product.price}</span>
                        <span class="product-original-price">৳${product.originalPrice}</span>
                        <span class="product-discount">-${product.discount}%</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id})">🛒 কার্টে</button>
                        <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">❤️</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    dealGrid.innerHTML = dealsHTML;
}

// ============ PRODUCTS DISPLAY ============
function displayProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:40px;">কোনো প্রোডাক্ট পাওয়া যায়নি!</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-rating">${getStars(product.rating)} (${product.reviews})</div>
                    <div>
                        <span class="product-price">৳${product.price}</span>
                        <span class="product-original-price">৳${product.originalPrice}</span>
                        <span class="product-discount">-${product.discount}%</span>
                    </div>
                    <div class="product-sold">${product.sold} বিক্রি</div>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id})">🛒 কার্টে যোগ</button>
                        <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">❤️</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function getStars(rating) {
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) stars += '⭐';
    return stars;
}

// ============ FILTERS ============
function applyFilters() {
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const minPrice = parseInt(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value) || Infinity;
    const sortBy = document.getElementById('sortBy')?.value || 'default';
    
    let filtered = products.filter(p => {
        const matchCategory = category === 'all' || p.category === category;
        const matchPrice = p.price >= minPrice && p.price <= maxPrice;
        return matchCategory && matchPrice;
    });
    
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'discount') filtered.sort((a, b) => b.discount - a.discount);
    
    displayProducts(filtered);
}

function filterCategory(category) {
    if (category === 'all') displayProducts(products);
    else displayProducts(products.filter(p => p.category === category));
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    displayProducts(products.filter(p => p.name.toLowerCase().includes(searchTerm)));
}

// ============ WISHLIST ============
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex >= 0) {
        wishlist.splice(existingIndex, 1);
        alert(product.name + ' উইশলিস্ট থেকে সরানো হয়েছে!');
    } else {
        wishlist.push(product);
        alert(product.name + ' উইশলিস্টে যোগ হয়েছে! ❤️');
    }
    updateWishlistCount();
}

function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
}

function showWishlist() {
    document.getElementById('wishlistModal').style.display = 'block';
    displayWishlistItems();
}

function closeWishlist() {
    document.getElementById('wishlistModal').style.display = 'none';
}

function displayWishlistItems() {
    const container = document.getElementById('wishlistItems');
    if (!container) return;
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:40px;">আপনার উইশলিস্ট খালি! ❤️</p>';
        return;
    }
    
    let html = '';
    wishlist.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.emoji} ${item.name}</div>
                    <div class="cart-item-price">৳${item.price}</div>
                </div>
                <div>
                    <button class="add-to-cart" onclick="addToCart(${item.id})" style="margin-right:10px;">🛒</button>
                    <button class="cart-item-remove" onclick="wishlist.splice(${index}, 1); updateWishlistCount(); displayWishlistItems();">✕</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// ============ CART ============
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    
    updateCartCount();
    alert(product.name + ' কার্টে যোগ হয়েছে! 🛒');
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function showCart() {
    document.getElementById('cartModal').style.display = 'block';
    displayCartItems();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function displayCartItems() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('totalPrice');
    if (!container || !totalElement) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:40px;">আপনার কার্ট খালি! 🛒</p>';
        totalElement.textContent = '0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.emoji} ${item.name}</div>
                    <div class="cart-item-price">৳${item.price} × ${item.quantity} = ৳${itemTotal}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">✕ মুছুন</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
    totalElement.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
}

function checkout() {
    if (cart.length === 0) {
        alert('আপনার কার্ট খালি!');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (confirm('মোট: ৳' + total + '\n\nঅর্ডার নিশ্চিত করুন?')) {
        alert('🎉 অর্ডার সফল! অস্যমাদায়।');
        cart = [];
        updateCartCount();
        closeCart();
    }
}

// ============ LOGIN ============
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    alert('🎉 লগইন সফল!');
    closeLogin();
}

function handleNewsletter(e) {
    e.preventDefault();
    alert('📧 ধন্যবাদ! আপনি নিউজলেটারে সাইন আপ হয়েছেন।');
}

// ============ CLOSE MODAL ON CLICK OUTSIDE ============
window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
}
