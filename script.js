let cart = [];
let cartVisible = false;

// Add product to cart
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

// Update cart UI
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}"
          onchange="changeQuantity(${index}, this.value)">
      </td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    cartItems.appendChild(row);
  });

  totalPriceEl.textContent = total.toFixed(2);
}

// Change quantity
function changeQuantity(index, newQty) {
  cart[index].quantity = parseInt(newQty);
  updateCart();
}

// Remove an item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Toggle cart visibility
function toggleCart() {
  const cartSection = document.getElementById("cartSection");
  cartVisible = !cartVisible;
  cartSection.classList.toggle("hidden", !cartVisible);

  const btn = document.getElementById("viewCartBtn");
  btn.textContent = cartVisible ? "Hide Cart" : "View Cart";
}
