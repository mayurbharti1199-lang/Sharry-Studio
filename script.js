/* =====================================================
   SHARRY STUDIO
   WEBSITE INTERACTIONS
===================================================== */


/* =====================================================
   PRODUCTS

   👇 YAHAN SE PRODUCTS EDIT KARNA
===================================================== */

const products = [

  {
    id:1,

    name:"Floral Printed Top",

    category:"tops",

    price:1299,

    oldPrice:1699,

    rating:"4.8",

    image:
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",

    description:
    "A beautiful everyday floral top designed for effortless styling.",

    sizes:["S","M","L","XL"]

  },


  {
    id:2,

    name:"Elegant Summer Dress",

    category:"dresses",

    price:1599,

    oldPrice:2099,

    rating:"4.9",

    image:
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",

    description:
    "A feminine silhouette made for brunches, dates and everyday moments.",

    sizes:["S","M","L","XL"]

  },


  {
    id:3,

    name:"Everyday Chic Tunic",

    category:"kurtis",

    price:1499,

    oldPrice:1899,

    rating:"4.8",

    image:
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=85",

    description:
    "Comfortable and stylish — perfect for your everyday wardrobe.",

    sizes:["S","M","L","XL"]

  },


  {
    id:4,

    name:"Minimal Black Dress",

    category:"western",

    price:1799,

    oldPrice:2299,

    rating:"4.9",

    image:
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",

    description:
    "A timeless black look that works from day to night.",

    sizes:["S","M","L","XL"]

  },


  {
    id:5,

    name:"Soft Pink Top",

    category:"tops",

    price:1199,

    oldPrice:1599,

    rating:"4.7",

    image:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",

    description:
    "Soft feminine styling with an effortless everyday fit.",

    sizes:["S","M","L","XL"]

  },


  {
    id:6,

    name:"Statement Party Dress",

    category:"dresses",

    price:2199,

    oldPrice:2799,

    rating:"4.9",

    image:
    "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=85",

    description:
    "A statement piece for special occasions.",

    sizes:["S","M","L","XL"]

  }

];


/* =====================================================
   STATE
===================================================== */

let currentProducts = [...products];

let cart = [];

let wishlist = new Set();


/* =====================================================
   PRODUCT RENDER
===================================================== */

function renderProducts(){

  const grid =
  document.getElementById("productGrid");


  if(!grid) return;


  grid.innerHTML =
  "";


  currentProducts.forEach(product => {


    const discount =
    Math.round(
      (1 - product.price / product.oldPrice) * 100
    );


    const card =
    document.createElement("article");


    card.className =
    "product-card";


    card.innerHTML = `

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <span class="sale-tag">
          ${discount}% OFF
        </span>

        <button
          class="wishlist-button
          ${wishlist.has(product.id) ? "active" : ""}"
          onclick="toggleWishlistItem(${product.id})"
        >
          ${wishlist.has(product.id) ? "♥" : "♡"}
        </button>

      </div>


      <h3>
        ${product.name}
      </h3>


      <div class="price">

        ₹${product.price.toLocaleString("en-IN")}

        <span class="old-price">
          ₹${product.oldPrice.toLocaleString("en-IN")}
        </span>

      </div>


      <div class="rating">
        ★★★★★
        <span style="color:#777">
          (${product.rating})
        </span>
      </div>


      <div class="product-buttons">

        <button
          class="quick-button"
          onclick="openQuickView(${product.id})"
        >
          Quick View
        </button>

        <button
          class="add-button"
          onclick="addToCart(${product.id})"
        >
          Add to Bag
        </button>

      </div>

    `;


    grid.appendChild(card);

  });

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

function filterProducts(category){

  if(category === "all"){

    currentProducts =
    [...products];

  }

  else{

    currentProducts =
    products.filter(
      product =>
      product.category === category
    );

  }


  renderProducts();


  const shop =
  document.getElementById("shop");


  if(shop){

    shop.scrollIntoView({
      behavior:"smooth"
    });

  }

}


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlistItem(id){

  if(wishlist.has(id)){

    wishlist.delete(id);

    showToast(
      "Removed from wishlist"
    );

  }

  else{

    wishlist.add(id);

    showToast(
      "Added to wishlist ♥"
    );

  }


  updateWishlistCount();

  renderProducts();

}


function updateWishlistCount(){

  document.getElementById(
    "wishlistCount"
  ).textContent =
  wishlist.size;

}


function toggleWishlist(){

  showToast(
    wishlist.size
    ? `${wishlist.size} item(s) in wishlist ♥`
    : "Your wishlist is empty"
  );

}


/* =====================================================
   CART
===================================================== */

function addToCart(id){

  const product =
  products.find(
    product =>
    product.id === id
  );


  if(!product) return;


  const existing =
  cart.find(
    item =>
    item.id === id
  );


  if(existing){

    existing.quantity++;

  }

  else{

    cart.push({

      ...product,

      quantity:1

    });

  }


  updateCart();


  showToast(
    `${product.name} added to your bag ✓`
  );

}


function updateCart(){

  const count =
  cart.reduce(
    (total,item) =>
    total + item.quantity,
    0
  );


  document.getElementById(
    "cartCount"
  ).textContent =
  count;


  const container =
  document.getElementById(
    "cartItems"
  );


  if(!cart.length){

    container.innerHTML = `

      <div style="
        text-align:center;
        padding:60px 20px;
        color:#756b68;
      ">

        <div style="
          font-size:45px;
          margin-bottom:15px;
        ">
          🛍
        </div>

        <h3>
          Your bag is empty
        </h3>

        <p>
          Discover something beautiful.
        </p>

      </div>

    `;

  }

  else{

    container.innerHTML =
    "";


    cart.forEach(item => {

      const element =
      document.createElement("div");


      element.className =
      "cart-item";


      element.innerHTML = `

        <img
          src="${item.image}"
          alt="${item.name}"
        >


        <div>

          <strong>
            ${item.name}
          </strong>

          <div>
            ₹${item.price.toLocaleString("en-IN")}
          </div>


          <div class="quantity">

            <button
              onclick="changeQuantity(${item.id},-1)"
            >
              −
            </button>

            ${item.quantity}

            <button
              onclick="changeQuantity(${item.id},1)"
            >
              +
            </button>

          </div>

        </div>


        <strong>
          ₹${(
            item.price *
            item.quantity
          ).toLocaleString("en-IN")}
        </strong>

      `;


      container.appendChild(
        element
      );

    });

  }


  const total =
  cart.reduce(
    (sum,item) =>
    sum +
    item.price *
    item.quantity,
    0
  );


  document.getElementById(
    "cartTotal"
  ).textContent =
  `₹${total.toLocaleString("en-IN")}`;

}


function changeQuantity(id,change){

  const item =
  cart.find(
    item =>
    item.id === id
  );


  if(!item) return;


  item.quantity +=
  change;


  if(item.quantity <= 0){

    cart =
    cart.filter(
      item =>
      item.id !== id
    );

  }


  updateCart();

}


/* =====================================================
   CART OPEN/CLOSE
===================================================== */

function openCart(){

  document
  .getElementById("cartOverlay")
  .classList.add("active");


  updateCart();

}


function closeCart(){

  document
  .getElementById("cartOverlay")
  .classList.remove("active");

}


/* =====================================================
   QUICK VIEW
===================================================== */

function openQuickView(id){

  const product =
  products.find(
    product =>
    product.id === id
  );


  if(!product) return;


  const content =
  document.getElementById(
    "quickContent"
  );


  content.innerHTML = `

    <div class="quick-content">

      <img
        src="${product.image}"
        alt="${product.name}"
      >


      <div class="quick-info">

        <p class="eyebrow">
          ${product.category}
        </p>

        <h2>
          ${product.name}
        </h2>


        <div class="price">

          ₹${product.price.toLocaleString("en-IN")}

          <span class="old-price">
            ₹${product.oldPrice.toLocaleString("en-IN")}
          </span>

        </div>


        <div class="rating">
          ★★★★★ ${product.rating}
        </div>


        <p>
          ${product.description}
        </p>


        <h4 style="margin-top:20px">
          Select Size
        </h4>


        <div class="size-options">

          ${product.sizes.map(
            size => `

              <button
                class="size-option"
                onclick="selectSize(this)"
              >
                ${size}
              </button>

            `
          ).join("")}

        </div>


        <button
          class="primary-btn full"
          onclick="
            addToCart(${product.id});
            closeQuickView();
          "
        >
          Add to Bag →
        </button>

      </div>

    </div>

  `;


  document
  .getElementById("quickView")
  .classList.add("active");

}


function closeQuickView(){

  document
  .getElementById("quickView")
  .classList.remove("active");

}


function selectSize(button){

  const parent =
  button.parentElement;


  parent
  .querySelectorAll(
    ".size-option"
  )
  .forEach(
    item =>
    item.classList.remove("selected")
  );


  button.classList.add(
    "selected"
  );

}


/* =====================================================
   SEARCH
===================================================== */

function openSearch(){

  document
  .getElementById("searchOverlay")
  .classList.add("active");


  setTimeout(() => {

    document
    .getElementById("searchInput")
    .focus();

  },100);

}


function closeSearch(){

  document
  .getElementById("searchOverlay")
  .classList.remove("active");

}


function searchProducts(){

  const input =
  document
  .getElementById("searchInput")
  .value
  .toLowerCase()
  .trim();


  const results =
  document.getElementById(
    "searchResults"
  );


  if(!input){

    results.innerHTML =
    "<p style='color:#756b68'>Start typing to search...</p>";

    return;

  }


  const matches =
  products.filter(
    product =>
    product.name
    .toLowerCase()
    .includes(input)
    ||
    product.category
    .toLowerCase()
    .includes(input)
  );


  if(!matches.length){

    results.innerHTML =
    "<p>No products found.</p>";

    return;

  }


  results.innerHTML =
  matches.map(
    product => `

      <div
        class="search-result"
        onclick="
          closeSearch();
          openQuickView(${product.id});
        "
      >

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div>

          <strong>
            ${product.name}
          </strong>

          <p>
            ₹${product.price.toLocaleString("en-IN")}
          </p>

        </div>

      </div>

    `
  ).join("");

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu(){

  document
  .getElementById("mobileMenu")
  .classList.toggle("active");

}


/* Close mobile menu after click */

document
.querySelectorAll(
  "#mobileMenu a"
)
.forEach(link => {

  link.addEventListener(
    "click",
    () => {

      document
      .getElementById("mobileMenu")
      .classList.remove("active");

    }
  );

});


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message){

  const toast =
  document.getElementById(
    "toast"
  );


  toast.textContent =
  message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  },2200);

}


function toast(message){

  showToast(message);

}


/* =====================================================
   NEWSLETTER
===================================================== */

function subscribe(event){

  event.preventDefault();


  const email =
  document
  .getElementById("email")
  .value;


  showToast(
    `Welcome to Sharry Studio ♥`
  );


  event.target.reset();

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout(){

  if(!cart.length){

    showToast(
      "Your bag is empty"
    );

    return;

  }


  /*
    DEMO CHECKOUT

    Later we can connect:

    Razorpay
    Stripe
    Cashfree
    UPI
    WhatsApp Orders
  */


  const total =
  cart.reduce(
    (sum,item) =>
    sum +
    item.price *
    item.quantity,
    0
  );


  const confirmed =
  confirm(

    `Order Total: ₹${total.toLocaleString("en-IN")}

Click OK to continue to checkout.`

  );


  if(confirmed){

    showToast(
      "Checkout ready — payment gateway can be connected here."
    );

  }

}


/* =====================================================
   COUNTDOWN
===================================================== */

const countdownDate =
new Date();

countdownDate.setDate(
  countdownDate.getDate() + 7
);


function updateCountdown(){

  const now =
  new Date().getTime();


  const distance =
  countdownDate.getTime() -
  now;


  if(distance <= 0){

    return;

  }


  const days =
  Math.floor(
    distance /
    (1000*60*60*24)
  );


  const hours =
  Math.floor(
    (distance %
    (1000*60*60*24))
    /
    (1000*60*60)
  );


  const minutes =
  Math.floor(
    (distance %
    (1000*60*60))
    /
    (1000*60)
  );


  const seconds =
  Math.floor(
    (distance %
    (1000*60))
    /
    1000
  );


  document.getElementById(
    "days"
  ).textContent =
  String(days).padStart(2,"0");


  document.getElementById(
    "hours"
  ).textContent =
  String(hours).padStart(2,"0");


  document.getElementById(
    "minutes"
  ).textContent =
  String(minutes).padStart(2,"0");


  document.getElementById(
    "seconds"
  ).textContent =
  String(seconds).padStart(2,"0");

}


setInterval(
  updateCountdown,
  1000
);


updateCountdown();


/* =====================================================
   BACK TO TOP
===================================================== */

window.addEventListener(
  "scroll",
  () => {

    const button =
    document.getElementById(
      "backTop"
    );


    if(window.scrollY > 600){

      button.classList.add(
        "show"
      );

    }

    else{

      button.classList.remove(
        "show"
      );

    }

  }
);


/* =====================================================
   CLICK OUTSIDE OVERLAYS
===================================================== */

document
.querySelectorAll(".overlay")
.forEach(overlay => {

  overlay.addEventListener(
    "click",
    event => {

      if(
        event.target === overlay
      ){

        overlay.classList.remove(
          "active"
        );

      }

    }
  );

});


/* =====================================================
   INITIALIZE
===================================================== */

renderProducts();

updateCart();

updateWishlistCount();
