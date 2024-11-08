'use strict';

/**
 * Toggle the active class on an element
 * @param {Element} elem - The element to toggle the class on
 */
const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * Navbar toggle functionality
 */
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

// Collect all elements that will toggle the navbar
const navElemArr = [overlay, navCloseBtn, navOpenBtn, ...navbarLinks];

/**
 * Add event listeners to toggle the navbar
 */
navElemArr.forEach(elem => {
  elem.addEventListener("click", () => {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
});

/**
 * Header active state on scroll
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 400) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});
