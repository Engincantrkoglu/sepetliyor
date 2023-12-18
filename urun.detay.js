/* anasayfa ile aynı olan ayarlar */
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

// Ürün miktarını tutan değişken
let quantity = 1;

// Ürün miktarını artırma
function increaseQuantity() {
  const quantityElement = document.getElementById('quantity');
  let currentQuantity = parseInt(quantityElement.textContent);
  currentQuantity++;
  quantityElement.textContent = currentQuantity;

  // Ürün miktarını güncelle
  updateQuantity();
}

// Ürün miktarını azaltma
function decreaseQuantity() {
  const quantityElement = document.getElementById('quantity');
  let currentQuantity = parseInt(quantityElement.textContent);

  // Ürün miktarını negatif olmayacak şekilde azalt
  if (currentQuantity > 1) {
    currentQuantity--;
    quantityElement.textContent = currentQuantity;

    // Ürün miktarını güncelle
    updateQuantity();
  }
}

// Sepete ekleme fonksiyonu
function addToCart(productId) {
  // Ürün bilgilerini al
  const productDetails = getProductDetails(productId);

  if (productDetails) {
    // Sepete eklenecek ürün objesi
    const cartItem = {
      productId: productId,
      name: productDetails.name,
      price: productDetails.price,
      image: productDetails.image,
      quantity: quantity
    };

    // Sepet bilgilerini local storage'a ekle
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Eğer sepette aynı ürün varsa, miktarını güncelle
    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('Ürün sepete eklendi:', cartItem);

    // Sepet sayısını güncelle
    updateCartCount();
  } else {
    console.error('Ürün bulunamadı:', productId);
  }
}

// Sepet sayısını güncelleyen fonksiyon
function updateQuantity() {
  quantity = parseInt(document.getElementById('quantity').textContent);
}

// Sepet sayısını güncelleme fonksiyonu
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');

  if (cartCount) {
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0).toString();
  }
}

// Örnek: Ürün bilgilerini almak için yardımcı bir fonksiyon
function getProductDetails(productId) {
  // Bu fonksiyonun içeriği, ürün bilgilerini almak için uygun şekilde doldurulmalıdır.
  // Örneğin, productId'ye göre bir veritabanı sorgusu yapabilirsiniz.
  // Burada basit bir örnek sağlıyorum, gerçek verilerinizle değiştirmeniz gerekecek.

  const productData = {
    429: { name: 'MSI 144HZ LAPTOP', price: 59.99, image: './format_webp (5).jfif' },
    // Diğer ürünler
  };

  return productData[productId];
}

// Sayfa yüklendiğinde çalışacak fonksiyon
window.onload = function () {
  // Sepet sayısını güncelle
  updateCartCount();
};
