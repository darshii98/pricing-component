"use-strict";

//selecting elements
const charges = document.getElementById("charges");
const dynamicInput = document.querySelector(".dynamic-inputs");
const slider = document.querySelector(".switch input");
const selector = document.querySelector("#selector");
const yearlyBill = document.querySelector(".yearly-bill span");

slider.oninput = function () {
  selector.style.left = this.value;
};

//some helper functions
const showCharge = function () {
  dynamicInput.firstElementChild.remove();
  dynamicInput.lastElementChild.remove();

  const html = `
  <h3 class="page-views">${+charges.value * 6.25}k Pageviews</h3>
  <h3 class="fee">$${charges.value}.00 <span>/month</span></h3>`;
  dynamicInput.insertAdjacentHTML("beforeend", html);

  const color = `linear-gradient(
    90deg,
    var(--primary-soft-cyan) ${(+charges.value - 8) * 6.25}%,
    var(--neutral-gray-blue-lt-1) ${(+charges.value - 8) * 6.25}%
  )`;

  charges.style.background = color;
};

const showDiscountedCharge = function () {
  dynamicInput.firstElementChild.remove();
  dynamicInput.lastElementChild.remove();

  const html = `
  <h3 class="page-views">${+charges.value * 6.25}k Pageviews</h3>
  <h3 class="fee">$${+charges.value * 0.75}.00 <span>/month</span></h3>`;
  dynamicInput.insertAdjacentHTML("beforeend", html);

  const color = `linear-gradient(
    90deg,
    var(--primary-soft-cyan) ${(+charges.value * 0.75 - 6) * 8.33}%,
    var(--neutral-gray-blue-lt-1) ${(+charges.value * 0.75 - 6) * 8.33}%
  )`;

  charges.style.background = color;
};

//iniit
charges.addEventListener("input", showCharge);

//event listeners
slider.addEventListener("change", function () {
  if (this.checked) {
    showDiscountedCharge();
    charges.addEventListener("input", showDiscountedCharge);
  }
  if (!this.checked) {
    showCharge();
    charges.removeEventListener("input", showDiscountedCharge);
    charges.addEventListener("input", showCharge);
  }
});
