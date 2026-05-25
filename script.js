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
        rating: 4.5,
        reviews: 234,
        sold: 1250,
        isDeal: false
    },
    {
        id: 2,
        name: "Xiaomi Redmi Note 12 Pro 5G",
        price: 26999,
        originalPrice: 32999,
        discount: 18,
        category: "electronics",
        emoji: "📱",
        rating: 4.7,
        reviews: 567,
        sold: 2340,
        isDeal: true
    },
    {
        id: 3,
        name: "HP Laptop 15s Intel Core i5 12th Gen",
        price: 58999,
        originalPrice: 72000,
        discount: 18,
        category: "laptop",
        emoji: "💻",
        rating: 4.6,
        reviews: 189,
        sold: 890,
        isDeal: false
    },
    {
        id: 4,
        name: "Dell Inspiron 15 Intel Core i3",
        price: 44999,
        originalPrice: 55000,
        discount: 18,
        category: "laptop",
        emoji: "💻",
        rating: 4.4,
        reviews: 145,
        sold: 567,
        isDeal: false
    },
    {
        id: 5,
        name: "Panjabi Premium Quality - সাদা",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        category: "clothing",
        emoji: "👕",
        rating: 4.3,
        reviews: 890,
        sold: 4500,
        isDeal: true
    },
    {
        id: 6,
        name: "Casual Shirt - সবুজ রং",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        category: "clothing",
        emoji: "👕",
        rating: 4.2,
        reviews: 234,
        sold: 2100,
        isDeal: false
    },
    {
        id: 7,
        name: "Nike Running Shoes - কালো",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        category: "shoes",
        emoji: "👟",
        rating: 4.8,
        reviews: 567,
        sold: 3200,
        isDeal: true
    },
    {
        id: 8,
        name: "Bata Formal Shoes - বাদামী",
        price: 2299,
        originalPrice: 2999,
        discount: 23,
        category: "shoes",
        emoji: "👞",
        rating: 4.5,
        reviews: 345,
        sold: 1800,
        isDeal: false
    },
    {
        id: 9,
        name: "Garnier Bright Complete Serum",
        price: 650,
        originalPrice: 850,
        discount: 24,
        category: "beauty",
        emoji: "💄",
        rating: 4.4,
        reviews: 678,
        sold: 5600,
        isDeal: true
    },
    {
        id: 10,
        name: "L'Oreal Revitalift Cream",
        price: 890,
        originalPrice: 1100,
        discount: 19,
        category: "beauty",
        emoji: "🧴",
        rating: 4.6,
        reviews: 456,
        sold: 3400,
        isDeal: false
    },
    {
        id: 11,
        name: "Apple iPhone 14 Pro Max",
        price: 145999,
        originalPrice: 159999,
        discount: 9,
        category: "electronics",
        emoji: "📱",
        rating: 4.9,
        reviews: 1234,
        sold: 8900,
        isDeal: false
    },
    {
        id: 12,
        name: "Lenovo ThinkPad Intel Core i5",
        price: 65999,
        originalPrice: 85000,
        discount: 22,
        category: "laptop",
        emoji: "💻",
        rating: 4.7,
        reviews: 289,
        sold: 1200,
        isDeal: true
    }
];

let cart = [];
let wishlist = [];
let currentSlide = 0;
const slides = [
    { emoji: "🎉", text: "৫০% ছাড় - সব মোবাইলে!", bg: "linear-gradient(135deg, #ff6b6b, #ee5a24)" },
    { emoji: "🚀", text: "নতুন ল্যাপটপ কালেকশন", bg: "linear-gradient(135deg, #667eea, #764ba2)" },
    { emoji: "💄", text: "বিউটি প্রোডাক্টে ৩০% ছাড়", bg: "linear-gradient(135deg, #11998e, #38ef7d)" }
];

document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    displaySlides();
    displayDeals();
    updateWishlistCount();
});

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
                    <div class="product-rating">${getRatingStars(product.rating)}</div>
                    <div>
                        <span class="product-price">৳${product.price.toLocaleString()}</span>
                        <span class="product-original-price">৳${product.originalPrice.toLocaleString()}</span>
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

function displayProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:40px;">কোনো প্রোডাক্ট পাওয়া যায়নি!</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-rating">${getRatingStars(product.rating)} <span style="color:#999">(${product.reviews})</span></div>
                    <div>
                        <span class="product-price">৳${product.price.toLocaleString()}</span>
                        <span class="product-original-price">৳${product.originalPrice.toLocaleString()}</span>
                        <span class="product-discount">-${product.discount}%</span>
                    </div>
                    <div class="product-sold">${product.sold.toLocaleString()} বিক্রি</div>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id})">🛒 কার্টে যোগ</button>
                        <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">❤️</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML;
    });
}

function getRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    return stars + ` (${rating})`;
}

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
    displayProducts(products.filter(p => p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm)));
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex >= 0) {
        wishlist.splice(existingIndex, 1);
        alert(`${product.name} উইশলিস্ট থেকে সরানো হয়েছে!`);
    } else {
        wishlist.push(product);
        alert(`${product.name} উইশলিস্টে যোগ হয়েছে! ❤️`);
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
    const wishlistContainer = document.getElementById('wishlistItems');
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p style="text-align:center;padding:40px;">আপনার উইশলিস্ট খালি! ❤️</p>';
        return;
    }
    
    let wishlistHTML = '';
    wishlist.forEach((item, index) => {
        wishlistHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.emoji} ${item.name}</div>
                    <div class="cart-item-price">৳${item.price.toLocaleString()}</div>
                </div>
                <div>
                    <button class="add-to-cart" onclick="addToCart(${item.id})" style="margin-right:10px;">🛒</button>
                    <button class="cart-item-remove" onclick="removeFromWishlist(${index})">✕</button>
                </div>
            </div>
        `;
    });
    wishlistContainer.innerHTML = wishlistHTML;
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    updateWishlistCount();
    displayWishlistItems();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    
    updateCartCount();
    alert(`${product.name} কার্টে যোগ হয়েছে! 🛒`);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function showCart() {
    document.getElementById('cartModal').style.display = 'block';
    displayCartItems();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

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
    
    const totalPrice = cart.reduce((sum, item) => sum + (item
