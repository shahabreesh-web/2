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
    sliderContainer.innerHTML = `<div class="slider-content"><div class="slider-emoji">${slides[0].emoji}</div><h1>${slides[0].text}</h1><button class="slider-btn">এখনই কিনুন</button></div><button class="slider-nav prev" onclick="changeSlide(-1)">❮</button><button class="slider-nav next" onclick="changeSlide(1)">❯</button>`;
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    const sliderContainer = document.getElementById('sliderContainer');
    sliderContainer.style.background = slides[currentSlide].bg;
    sliderContainer.innerHTML = `<div class="slider-content"><div class="slider-emoji">${slides[currentSlide].emoji}</div><h1>${slides[currentSlide].text}</h1><button class="slider-btn">এখনই কিনুন</button></div><button class="slider-nav prev" onclick
