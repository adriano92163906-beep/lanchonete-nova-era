const products = [
  { id: 1, name: "X-Burguer", desc: "Pão, hambúrguer, queijo, alface, tomate e molho especial", price: 12.90, oldPrice: null, cat: "Lanches", img: "images/burguer.jpg", badge: { label: "Mais pedido", cls: "bg-nova-yellow text-nova-black" } },
  { id: 2, name: "Cachorro Quente", desc: "Salsicha, molho, maionese, ketchup e batata palha", price: 9.90, oldPrice: 11.90, cat: "Lanches", img: "images/cachorro-quente.jpg", badge: { label: "Oferta", cls: "bg-nova-red text-white" } },
  { id: 3, name: "Tapioca de Queijo", desc: "Massa de tapioca com queijo coalho e orégano", price: 8.90, oldPrice: null, cat: "Tapiocas & Pães", img: "images/tapioca.jpg", badge: { label: "Leve e saudável", cls: "bg-green-600 text-white" } },
  { id: 4, name: "Açaí na Tigela", desc: "Açaí batido com frutas e granola", price: 14.90, oldPrice: null, cat: "Sobremesas", img: "images/acai.jpg", badge: null },
  { id: 5, name: "Porção de Batata Frita", desc: "Porção generosa, crocante por fora e macia por dentro", price: 9.90, oldPrice: null, cat: "Porções", img: "images/batata-frita.jpg", badge: null },
  { id: 6, name: "Nuggets (10 un.)", desc: "Nuggets de frango crocantes, servidos com molho", price: 11.90, oldPrice: null, cat: "Porções", img: "images/nuggets.jpg", badge: null },
  { id: 7, name: "Coca-Cola 350ml", desc: "Refrigerante gelado, lata 350ml", price: 5.50, oldPrice: null, cat: "Bebidas", img: "images/coca-cola.jpg", badge: null },
  { id: 8, name: "Suco Natural 300ml", desc: "Suco natural de frutas da estação, sem açúcar", price: 7.90, oldPrice: null, cat: "Sucos Naturais", img: "images/suco-natural.jpg", badge: null },
];

let cart = [];
let activeCategory = "Todos";
let searchTerm = "";

const grid = document.getElementById("productGrid");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartHeaderCountEl = document.getElementById("cartHeaderCount");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

const PILL_ACTIVE = ["bg-nova-red", "border-nova-red", "text-white"];
const PILL_INACTIVE = ["bg-navy-card", "border-navy-border", "text-gray-300"];

function formatBRL(v) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}

function renderProducts() {
  const filtered = products.filter(p => {
    const matchCat = activeCategory === "Todos" || p.cat === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(p => `
    <div class="relative bg-cardRed-bg border border-cardRed-border shadow-sm rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-nova-yellow">
      ${p.badge ? `<span class="absolute top-2.5 left-2.5 text-[11px] font-extrabold px-2.5 py-1 rounded-full z-10 ${p.badge.cls}">${p.badge.label}</span>` : ""}
      <div class="h-[130px] flex items-center justify-center overflow-hidden bg-navy-bg">
        <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover">
      </div>
      <div class="p-4 flex flex-col gap-1.5 flex-1">
        <h4 class="text-[15px] font-bold text-white">${p.name}</h4>
        <p class="text-xs text-white/70 min-h-[30px]">${p.desc}</p>
        <div class="flex items-baseline gap-2 mt-auto">
          ${p.oldPrice ? `<span class="text-xs text-white/50 line-through">${formatBRL(p.oldPrice)}</span>` : ""}
          <span class="text-lg font-extrabold text-nova-yellow">${formatBRL(p.price)}</span>
        </div>
        <button class="add-btn mt-2 bg-nova-yellow text-nova-black py-2 rounded-lg font-bold text-[13px] hover:brightness-95 transition-colors flex items-center justify-center gap-1.5" data-id="${p.id}">🛒 Adicionar ao carrinho</button>
      </div>
    </div>
  `).join("") || `<p class="text-gray-400 col-span-full text-center py-10">Nenhum produto encontrado.</p>`;

  grid.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function renderCart() {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = totalQty;
  cartHeaderCountEl.textContent = `(${totalQty})`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="text-gray-400 text-sm text-center py-5">Seu carrinho está vazio.</p>`;
  } else {
    cartItemsEl.innerHTML = cart.map(i => `
      <div class="flex items-center gap-2.5 bg-navy-bg rounded-xl px-2.5 py-2">
        <img class="w-10 h-10 rounded-lg object-cover shrink-0" src="${i.img}" alt="${i.name}">
        <div class="flex-1">
          <strong class="text-[13px] block text-white">${i.name}</strong>
          <span class="text-xs text-nova-yellow font-bold">${formatBRL(i.price)}</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="w-[22px] h-[22px] bg-nova-red text-white rounded-md text-[13px] font-bold" data-action="dec" data-id="${i.id}">−</button>
          <span class="text-[13px] font-bold min-w-[14px] text-center text-white">${i.qty}</span>
          <button class="w-[22px] h-[22px] bg-nova-red text-white rounded-md text-[13px] font-bold" data-action="inc" data-id="${i.id}">+</button>
        </div>
        <button class="text-gray-400 text-base ml-1" data-action="remove" data-id="${i.id}">🗑</button>
      </div>
    `).join("");

    cartItemsEl.querySelectorAll("button[data-action]").forEach(btn => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;
      btn.addEventListener("click", () => {
        if (action === "inc") changeQty(id, 1);
        if (action === "dec") changeQty(id, -1);
        if (action === "remove") removeItem(id);
      });
    });
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  subtotalEl.textContent = formatBRL(subtotal);
  totalEl.textContent = formatBRL(subtotal);
}

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  renderCart();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderProducts();
});

document.querySelectorAll(".cat-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".cat-pill").forEach(p => {
      p.classList.remove(...PILL_ACTIVE);
      p.classList.add(...PILL_INACTIVE);
    });
    pill.classList.remove(...PILL_INACTIVE);
    pill.classList.add(...PILL_ACTIVE);
    activeCategory = pill.dataset.cat;
    renderProducts();
  });
});

document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Pedido finalizado! Obrigado por comprar na Lanchonete Nova Era 🍔");
  cart = [];
  renderCart();
});

renderProducts();
renderCart();
