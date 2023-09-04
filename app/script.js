//burger code
const burger = document.querySelector("[data-burger]");
const linkWrapper = document.querySelector(".link-wrapper");
const nav = document.querySelector("nav");
const closenav = document.querySelector(".close-btn");

burger.addEventListener("click", () => {
  linkWrapper.classList.toggle("open-4navchild");
  nav.classList.toggle("open-4nav");
});
closenav.addEventListener("click", () => {
  linkWrapper.classList.toggle("open-4navchild");
  nav.classList.toggle("open-4nav");
});

// cart toggling
const cartContainer = document.querySelector("[data-cart]");
const cartBtn = document.querySelector(".cart");
cartBtn.addEventListener("click", cartbtntoggling);
function cartbtntoggling() {
  cartContainer.classList.toggle("cart-visible");
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
const addCartEl = document.querySelector("[data-addtocartbtn]");
addCartEl.addEventListener("click", addtocart);
function addtocart(e) {
  let id = e.currentTarget.dataset.addtocartbtn;
  const cartContainer = document.querySelector(".cart-i-container");
  const quantityEl = document.querySelector("[data-quantity-val]");
  let cartItemEl = document.createElement("div");
  cartItemEl.classList.add(`cart-item-${id}`, "cart-items");

  if (quantityEl.innerText === "0") {
    alert("Warning: Please put some quantity!");
  } else {
    const total = 250.0 * parseInt(quantityEl.innerText);

    cartItemEl.innerHTML = `
    <img src="./assets/images/image-product-1.jpg" alt="pr-img" />
    <div class="c-item-details">
      <strong>Autumn Limited Edition</strong>
      <span class="price">$250.00</span>
      &times
      <span class="i-quantity">${quantityEl.innerText}</span>
      <span class="i-total">$${total}</span>
    </div>
    <img data-del-btn src="./assets/images/icon-delete.svg" alt="del" />
      `;

    cartContainer.append(cartItemEl);
    quantityEl.innerText = 0;
    let updatedid = parseInt(id) + 1;
    e.currentTarget.dataset.addtocartbtn = updatedid;
  }
  updatethecart();
}
//remove btn code
const mainCartContainer = document.querySelector(".cart-i-container");
mainCartContainer.addEventListener("click", surenadelete);

function surenadelete(e) {
  const itemDel = e.target;

  if (itemDel.alt === "del") {
    const item = itemDel.parentElement;
    item.remove();
    updatethecart();
  }
}

//update cart
function updatethecart() {
  const cartContainer = document.querySelector(".cart-i-container");
  const notifCount = document.querySelector(".beforesana");
  let cartItemLength = cartContainer.children.length;
  if (cartItemLength <= 0) {
    document.querySelector("[data-empty]").style.display = "block";
    document.querySelector("[data-checkout]").style.display = "none";
    cartContainer.classList.remove("csscart");
    notifCount.style.display = "none";
  } else {
    document.querySelector("[data-empty]").style.display = "none";
    document.querySelector("[data-checkout]").style.display = "block";
    cartContainer.classList.add("csscart");
    notifCount.style.display = "block";
    notifCount.innerText = cartItemLength;
  }
}
// image slider
function handleSliderButtonClick(btn) {
  const offSet = btn.dataset.sbtns === "next" ? 1 : -1;
  const sliderContainer = btn.closest("[data-sc-btns]").nextElementSibling;

  const activeimg = sliderContainer.querySelector("[data-active-pr]");
  let indexOfActiveImg =
    Array.from(sliderContainer.children).indexOf(activeimg) + offSet;

  if (indexOfActiveImg < 0)
    indexOfActiveImg = sliderContainer.children.length - 1;
  if (indexOfActiveImg >= sliderContainer.children.length) indexOfActiveImg = 0;

  // Adding dataset to the img
  sliderContainer.children[indexOfActiveImg].dataset.activePr = true;
  // Deleting activePr dataset from the current active slide
  delete activeimg.dataset.activePr;
}

function handleThumbnailClick(
  thumbnail,
  index,
  thumbnailImages,
  modal = false
) {
  thumbnail.addEventListener("click", (e) => {
    const offset = index;
    const sliderContainer = document.querySelector(
      `.big-product-img-container${modal ? "-modal" : ""}`
    );
    const activeBigImg = sliderContainer.querySelector("[data-active-pr]");
    delete activeBigImg.dataset.activePr;

    thumbnailImages.forEach((thumb) => {
      delete thumb.dataset.activeThumb;
    });

    // Adding dataset active trigger to the img
    e.target.dataset.activeThumb = true;
    sliderContainer.children[offset].dataset.activePr = true;
    // Deleting activePr dataset from the current active slide
  });
}

const sliderBtns = document.querySelectorAll(".s-btn");
const thumbnailImages = Array.from(
  document.querySelector(".thumbnails-img-container").children
);
const bigProductContainer = document.querySelector(
  ".big-product-img-container"
).children;

sliderBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleSliderButtonClick(btn);
  });
});
thumbnailImages.forEach((thumbnail, index) => {
  handleThumbnailClick(thumbnail, index, thumbnailImages);
});

function setSelectActiveModalImages(offSet) {
  const sliderContainer = Array.from(
    document.querySelector(`.big-product-img-container-modal`).children
  );
  const thumbnailImages = Array.from(
    document.querySelector(".thumbnails-img-container-modal").children
  );
  //deleting first
  thumbnailImages.forEach((thumb) => {
    delete thumb.dataset.activeThumb;
  });
  sliderContainer.forEach((img) => {
    delete img.dataset.activePr;
  });
  //setting the active
  console.log(thumbnailImages[offSet]);
  thumbnailImages[offSet].dataset.activeThumb = true;
  sliderContainer[offSet].dataset.activePr = true;
}

Array.from(bigProductContainer).forEach((bigProduct, index) => {
  bigProduct.addEventListener("click", (event) => {
    document.getElementById("myModal").style.display = "grid";
    if (cartContainer.classList.contains("cart-visible")) {
      cartContainer.classList.remove("cart-visible");
    }

    setSelectActiveModalImages(index);
    const sliderBtnModal = document.querySelectorAll(".modal-slider-btn");
    const thumbnailImagesModal = Array.from(
      document.querySelector(".thumbnails-img-container-modal")?.children
    );

    sliderBtnModal?.forEach((btn) => {
      btn.addEventListener("click", () => {
        handleSliderButtonClick(btn);
      });
    });

    thumbnailImagesModal?.forEach((thumbnail, index) => {
      handleThumbnailClick(thumbnail, index, thumbnailImagesModal, true);
    });
  });
});

// Function to close the modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
