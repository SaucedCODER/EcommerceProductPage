//burger code
const burger = document.querySelector("[data-burger]");
const linkwrapper = document.querySelector(".link-wrapper");
const nav = document.querySelector("nav");
const closenav = document.querySelector(".close-btn");

burger.addEventListener("click", () => {
  linkwrapper.classList.toggle("open-4navchild");
  nav.classList.toggle("open-4nav");
});
closenav.addEventListener("click", () => {
  linkwrapper.classList.toggle("open-4navchild");
  nav.classList.toggle("open-4nav");
});

// cart toggling
const cart_container = document.querySelector("[data-cart]");
const cartbtn = document.querySelector(".cart");
cartbtn.addEventListener("click", cartbtntoggling);
function cartbtntoggling() {
  cart_container.classList.toggle("cart-visible");
}
// quantity changes code
const quan_container = document.querySelector(".quantity-container");
const quan_btns = quan_container.querySelectorAll("img[alt]");
quan_btns.forEach((qbtn) => {
  qbtn.addEventListener("click", (e) => {
    let currentquan_el = quan_container.querySelector("[data-quantity-val]");
    const intquanval = parseInt(currentquan_el.innerText);
    let offset = e.target.alt === "increment" ? 1 : -1;
    if (intquanval == 0 && offset < 0) offset = 0;
    currentquan_el.innerHTML = intquanval + offset;
    currentquan_el.dataset.quantityVal = intquanval + offset;
  });
});
//add to cart codes
const addcartbtn_el = document.querySelector("[data-addtocartbtn]");
addcartbtn_el.addEventListener("click", addtocart);
function addtocart(e) {
  let item_id = e.currentTarget.dataset.addtocartbtn;
  const cart_icontainer = document.querySelector(".cart-i-container");
  const iquantity = document.querySelector("[data-quantity-val]");
  let cart_item_el = document.createElement("div");
  cart_item_el.classList.add(`cart-item-${item_id}`, "cart-items");

  if (iquantity.innerText === "0") {
    alert("Warning: Please put some quantity!");
  } else {
    const total = 250.0 * parseInt(iquantity.innerText);

    cart_item_el.innerHTML = `
    <img src="./assets/images/image-product-1.jpg" alt="pr-img" />
    <div class="c-item-details">
      <strong>Autumn Limited Edition</strong>
      <span class="price">$250.00</span>
      &times
      <span class="i-quantity">${iquantity.innerText}</span>
      <span class="i-total">$${total}</span>
    </div>
    <img data-del-btn src="./assets/images/icon-delete.svg" alt="del" />
      `;

    cart_icontainer.append(cart_item_el);
    iquantity.innerText = 0;
    let updatedid = parseInt(item_id) + 1;
    e.currentTarget.dataset.addtocartbtn = updatedid;
  }
  updatethecart();
}
//remove btn code
const cart_icontainerorig = document.querySelector(".cart-i-container");
cart_icontainerorig.addEventListener("click", surenadelete);

function surenadelete(e) {
  const itemdelbtn = e.target;

  if (itemdelbtn.alt === "del") {
    const item = itemdelbtn.parentElement;
    item.remove();
    updatethecart();
  }
}

//update cart
function updatethecart() {
  const cart_icontainer = document.querySelector(".cart-i-container");
  const notif_count = document.querySelector(".beforesana");
  let cartitemlength = cart_icontainer.children.length;
  if (cartitemlength <= 0) {
    document.querySelector("[data-empty]").style.display = "block";
    document.querySelector("[data-checkout]").style.display = "none";
    cart_icontainer.classList.remove("csscart");
    notif_count.style.display = "none";
  } else {
    document.querySelector("[data-empty]").style.display = "none";
    document.querySelector("[data-checkout]").style.display = "block";
    cart_icontainer.classList.add("csscart");
    notif_count.style.display = "block";
    notif_count.innerText = cartitemlength;
  }
}
// image slider
const slider_btns = document.querySelectorAll(".s-btn");

slider_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const offset = btn.dataset.sbtns === "next" ? 1 : -1;
    const s_images_container = btn.closest("[data-sc-btns]").nextElementSibling;

    const activeimg = s_images_container.querySelector("[data-active-pr]");
    let indexofactiveimg =
      [...s_images_container.children].indexOf(activeimg) + offset;

    if (indexofactiveimg < 0)
      indexofactiveimg = s_images_container.children.length - 1;
    if (indexofactiveimg >= s_images_container.children.length)
      indexofactiveimg = 0;

    //adding dataset to the img
    s_images_container.children[indexofactiveimg].dataset.activePr = true;
    //deleting activePr dataset from current active slide
    delete activeimg.dataset.activePr;
  });
});
