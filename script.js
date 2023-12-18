// Sayfa yüklendiğinde yapılacak işlemler
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menü toggle elementini seç
  const menuToggle = document.querySelector(".menu-toggle");

  // Kategoriler menüsünü seç
  const categoriesMenu = document.querySelector(".categories-menu");

  // Boş bir yere tıklandığında menüyü kapat
  document.addEventListener("click", function (event) {
      const isMenuOpen = categoriesMenu.style.display === "block";
      const isClickInsideMenu = categoriesMenu.contains(event.target);
      const isClickOnMenuToggle = menuToggle.contains(event.target);

      if (isMenuOpen && !isClickInsideMenu && !isClickOnMenuToggle) {
          categoriesMenu.style.display = "none";
      }
  });

  // Sayfa yüklendiğinde menüyü kapat
  categoriesMenu.style.display = "none";
});

// Hamburger menüyü açma/kapatma fonksiyonu
function toggleMenu() {
  const categoriesMenu = document.querySelector(".categories-menu");
  categoriesMenu.style.display = (categoriesMenu.style.display === "block") ? "none" : "block";
}
 // giriş yapan kullanıcını adını sağ üstte gösteme
let isLogoutMenuOpen = false;

document.addEventListener("DOMContentLoaded", function () {
    const userInfoLi = document.getElementById("user-info");
    
    const storedUsername = localStorage.getItem("loggedInUsername");

    if (storedUsername) {
        userInfoLi.innerHTML = `<a href="#" onclick="toggleLogoutMenu(event)"> ${storedUsername}</a>`;
    }
});

 // giriş yapan kullanıcını adını sağ üstte gösteme
 function toggleLogoutMenu(event) {
  event.preventDefault(); // Sayfanın kaydırılmasını engelle

  const userInfoLi = document.getElementById("user-info");
  
  if (isLogoutMenuOpen) {
      // Çıkış menüsü zaten açıksa kapat
      userInfoLi.removeChild(userInfoLi.lastChild);
  } else {
      // Çıkış menüsü kapalıysa aç
      const logoutList = document.createElement("ul");
      logoutList.classList.add("logout-menu"); // Yeni eklenen class

      const logoutItem = document.createElement("li");
      const logoutLink = document.createElement("a");

      logoutLink.href = "#";
      logoutLink.textContent = "Çıkış Yap";
      logoutLink.onclick = logout;

      logoutItem.appendChild(logoutLink);
      logoutList.appendChild(logoutItem);

      userInfoLi.appendChild(logoutList);
  }

  // Durumu tersine çevir
  isLogoutMenuOpen = !isLogoutMenuOpen;
}

function logout() {
  // Çıkış yapma işlemleri burada yapılacak
  // Örneğin localStorage'dan kullanıcı bilgilerini temizleme
  localStorage.removeItem("loggedInUsername");

  // Sayfayı yenileme
  location.reload();
}
// product-box div'ine tıklandığında ürün detay sayfasına yönlendir
function redirectToProductDetail() {
  // Ürün detay sayfasının URL'ini belirleyin
  const productDetailURL = "./urun.detay.html"; // Ürün detay sayfasının adını ve uzantısını ayarlayın

  // Ürün detay sayfasına yönlendirin
  window.location.href = productDetailURL;
}


//ürün geçişi
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const intervalTime = 5000; // Otomatik geçiş süresi (milisaniye cinsinden)

function showSlide(index) {
  slides.forEach((slide) => (slide.style.display = "none"));
  slides[index].style.display = "block";
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
  console.log('Next button clicked');
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
  console.log('Previous button clicked');
}
document.querySelector(".prev-button").addEventListener("click", function () {
  prevSlide();
});

document.querySelector(".next-button").addEventListener("click", function () {
  nextSlide();
});

// İlk slaytı göster
showSlide(currentIndex);

// Otomatik geçiş için timer
let timer = setInterval(nextSlide, intervalTime);

// Kullanıcının fareyle slaytın üzerine gelmesini kontrol etmek için
document.querySelector(".container").addEventListener("mouseover", () => {
  clearInterval(timer);
});

// Kullanıcının fareyi slaytın üzerinden çekmesini kontrol etmek için
document.querySelector(".container").addEventListener("mouseout", () => {
  timer = setInterval(nextSlide, intervalTime);
});


//sepet yapısı
function addToCart(productId) {
  
  // Ürün bilgilerini al
  const productBox = document.querySelector(`.product-box[data-product-id="${productId}"]`);

  if (productBox) {
    const name = productBox.querySelector('h3').textContent;
    const price = parseFloat(productBox.querySelector('p').textContent.replace('Fiyat: $', ''));
    const image = productBox.querySelector('img').getAttribute('src');

    // Ürün bilgilerini local storage'dan al
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kontrol: Eğer ürün zaten sepette varsa, miktarını artır
    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      // Eğer ürün sepette yoksa, yeni bir öğe olarak ekle
      const cartItem = { name, price, image, quantity: 1 };
      cart.push(cartItem);
    }

    // Güncellenmiş sepet bilgilerini local storage'a geri kaydet
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('Ürün local storage\'a eklendi:', cart);

    // Sepet sayısını güncelle
    updateCartCount();
  } else {
    console.error('Ürün bulunamadı:', productId);
  }
}

// Sepet sayısını güncelle
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');

  if (cartCount) {
    // Toplam ürün miktarını hesapla
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Sepet sayısını güncelle
    cartCount.textContent = totalQuantity.toString();
  }
}
