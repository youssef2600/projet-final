document.addEventListener("DOMContentLoaded", () => {
  // Common elements
  const cartIcon = document.getElementById("cart-icon");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCartBtn = document.getElementById("close-cart");
  const checkoutBtn = document.getElementById("checkout-btn");

  const cartItemsContainer = document.getElementById("cart-items"); // Sidebar
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  const orderSummary = document.getElementById("order-summary"); // Checkout
  const orderTotal = document.getElementById("order-total");

  // Load shared cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function renderCart() {
    let total = getTotal();

    // Sidebar
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div>
            <p>${item.name}</p>
            <p>${item.price} dt x ${item.quantity}</p>
          </div>
          <button class="remove" data-index="${index}">✕</button>
        `;
        cartItemsContainer.appendChild(div);
      });
      if (cartTotal) cartTotal.textContent = total + " dt";
    }

    // Checkout order summary
    if (orderSummary) {
      orderSummary.innerHTML = "";
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;border-radius:8px;margin-right:10px;">
          <div>
            <p><strong>${item.name}</strong></p>
            <p>${item.price} dt x ${item.quantity}</p>
          </div>
          <button class="remove" data-index="${index}">✕</button>
        `;
        orderSummary.appendChild(div);
      });
      if (orderTotal) orderTotal.textContent = "Total: " + total + " dt";
    }

    // Cart count in nav
    if (cartCount) {
      cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    }

    saveCart();
  }

  // Add to cart
  document.querySelectorAll(".add").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productCard = e.target.closest(".item");
      const name = productCard.querySelector("p").textContent;
      const priceText = productCard
        .querySelector(".price")
        .textContent.replace("dt", "")
        .trim();
      const price = parseInt(priceText);
      const image = productCard.querySelector("img").src;

      const existing = cart.find((i) => i.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }
      renderCart();
    });
  });

  // Remove item (works for sidebar + checkout)
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    }
  });

  // Sidebar toggle
  cartIcon?.addEventListener("click", () => cartSidebar?.classList.add("open"));
  closeCartBtn?.addEventListener("click", () =>
    cartSidebar?.classList.remove("open")
  );

  // Go to checkout
  checkoutBtn?.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  // Initial render
  renderCart();
});
