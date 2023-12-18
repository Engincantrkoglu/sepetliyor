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


  //sağ üstte giriş yapan kullanıcının adını gösterme
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

  
  //sepet yapısı
// Sepet içeriğini oluştur
// Sepet içeriğini oluştur
const cartContainer = document.getElementById("cart-container");
const totalContainer = document.getElementById("total-container");
const quantityContainer = document.getElementById("quantity-container");
const cartCount = document.getElementById("cart-count");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartContainer.innerHTML = "";
    let totalQuantity = 0;

    cartItems.forEach(function (item) {
        const productBox = document.createElement("div");
        productBox.classList.add("product-box");

        const productImage = document.createElement("img");
        productImage.src = item.image;
        productImage.alt = item.name;

        const productName = document.createElement("h3");
        productName.textContent = item.name;

        const productQuantity = document.createElement("p");
        productQuantity.textContent = "Miktar: " + item.quantity;

        const productPrice = document.createElement("p");
        productPrice.textContent = "Fiyat: $" + item.price.toFixed(2);
  
          // ... (Diğer kodlar)
  
          const increaseButton = document.createElement("button");
          increaseButton.textContent = "➕";
          increaseButton.id = "increase-button-" + item.id; // ID ekledik dinamik olarak
          increaseButton.addEventListener("click", function () {
              increaseQuantity(item);
          });
  
          const decreaseButton = document.createElement("button");
          decreaseButton.textContent = "➖";
          decreaseButton.id = "decrease-button-" + item.id; // ID ekledik dinamik olarak
          decreaseButton.addEventListener("click", function () {
              decreaseQuantity(item);
          });
  
          const removeButton = document.createElement("button");
          removeButton.textContent = "🗑️";
          removeButton.id = "remove-button-" + item.id; // ID ekledik dinamik olarak
          removeButton.addEventListener("click", function () {
              removeItem(item);
          });
  
          // ... (Diğer kodlar)
   

        productBox.appendChild(productImage);
        productBox.appendChild(productName);
        productBox.appendChild(productQuantity);
        productBox.appendChild(productPrice);
        productBox.appendChild(increaseButton);
        productBox.appendChild(decreaseButton);
        productBox.appendChild(removeButton);

        cartContainer.appendChild(productBox);

        totalQuantity += item.quantity;
    });

    const totalPrice = cartItems.reduce(function (total, item) {
        return total + item.price * item.quantity;
    }, 0);

    totalContainer.textContent = "Toplam Fiyat: $" + totalPrice.toFixed(2);
    quantityContainer.innerHTML = "Toplam Ürün Adeti: <span id=\"quantity\">" + totalQuantity + "</span> adet";

    // Sepetteki toplam ürün sayısını güncelle
    updateCartCount(totalQuantity);
}

function updateCartCount(totalQuantity) {
    if (cartCount) {
        // Sepetteki toplam ürün adetini göster
        cartCount.textContent = totalQuantity.toString();
    }
}

function increaseQuantity(item) {
    item.quantity++;
    saveCart();
    renderCart();
}

function decreaseQuantity(item) {
    if (item.quantity > 1) {
        item.quantity--;
        saveCart();
        renderCart();
    }
}

function removeItem(item) {
  // Eğer referans bulunduysa, sadece o ürünü kaldırın
  const updatedCartItems = cartItems.filter(cartItem => cartItem !== item);

  cartItems = updatedCartItems;
  saveCart();
  renderCart();
}


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

renderCart();

const buyButton = document.getElementById("buy-button");
buyButton.addEventListener("click", function () {
    localStorage.removeItem("cart");
    cartItems = [];
    renderCart();
    location.reload();
    alert("Başarılı bir şekilde satın aldınız!");
});


window.onload = function () {
    // Sayfa yüklendiğinde çalışacak fonksiyon
    updateCartCount(cartItems.reduce(function (total, item) {
        return total + item.quantity;
    }, 0));
};

// Sepet sayısını güncelleme fonksiyonu
document.addEventListener("DOMContentLoaded", function () {
    const cartItemCountSpan = document.querySelector(".cart-item-count");
  
    // localStorage'da kaydedilen ürünleri alın
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Sepetteki toplam ürün sayısını alın
    const totalQuantity = cartItems.reduce(function (total, item) {
      return total + item.quantity;
    }, 0);
  
    // Sepetteki toplam ürün sayısını span içerisine yazın
    cartItemCountSpan.textContent = `(${totalQuantity} Ürün)`;
    
  });

 