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

  /* giriş yap kayıt ol kısmı için ayarlar */
// JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    let registeredUsers = [];

    const storedUsers = localStorage.getItem("registeredUsers");
    if (storedUsers) {
        registeredUsers = JSON.parse(storedUsers);
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const isUserValid = registeredUsers.some(user => user.username === username && user.password === password);

        if (isUserValid) {
            alert("Giriş başarılı!");
            // Başarılı giriş sonrasında kullanıcının adını sakla
            localStorage.setItem("loggedInUsername", username);
            // Başarılı giriş sonrasında ana sayfaya yönlendirme
            window.location.href = "index.html";
        } else {
            alert("Kullanıcı adı veya şifre hatalı yada Kayıtlı değilsin!");
            // Hatalı giriş sonrasında formu sıfırla
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;

        const isUserRegistered = registeredUsers.some(user => user.username === newUsername);

        if (isUserRegistered) {
            alert("Zaten kayıtlısınız. Lütfen giriş yapmayı deneyin.");
            // Kayıtlı kullanıcı uyarısı verildikten sonra formu temizle
            clearRegisterForm();
        } else {
            registeredUsers.push({ username: newUsername, password: newPassword });
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            // Kayıt olduktan sonra formu temizle
            clearRegisterForm();

            // Başarılı kayıt mesajını göster
            alert("Başarılı şekilde kayıt oldunuz. Lütfen giriş yapın.");
        }
    });

    function clearRegisterForm() {
        const newUsernameInput = document.getElementById("newUsername");
        const newPasswordInput = document.getElementById("newPassword");

        // Input alanlarını temizle
        if (newUsernameInput) {
            newUsernameInput.value = "";
        }

        if (newPasswordInput) {
            newPasswordInput.value = "";
        }
    }
});
// Sepet sayısını güncelleme fonksiyonu
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








// Buraya giriş ve kayıt işlemleri için JavaScript kodlarını ekleyebilirsiniz.
