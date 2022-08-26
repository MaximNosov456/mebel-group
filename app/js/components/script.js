import Swiper, { Navigation, Pagination } from "swiper";
import { webp } from "./_webp";
// import { accordion } from "./_accordeon";
// import { rangeSliderMax } from "./_rangeSlider";

webp(document.body);
// accordion();
// rangeSliderMax();

const swiper = new Swiper(".swiper-hero-slider", {
  loop: true,
  pagination: {
    el: ".swiper-hero-slider-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  spaceBetween: 10,
  modules: [Navigation, Pagination],
  // breakpoints: {
  //   320: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   480: {
  //     slidesPerView: 3,
  //     spaceBetween: 30,
  //   },
  //   640: {
  //     slidesPerView: 4,
  //     spaceBetween: 40,
  //   },
  // },
});

// Burger and smooth scroll
// const burger = document.querySelector(".hamburger");
// const menuLinks = document.querySelectorAll(".menu__list-link");
// const menu = document.querySelector(".menu");
// function toggleMenu() {
//   burger.classList.toggle("active");
//   menu.classList.toggle("active");
// }
// burger.addEventListener("click", toggleMenu);
// menuLinks.forEach((link) =>
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const attr = this.getAttribute("href");
//     const section = document.querySelector(attr);
//     window.scrollTo({
//       top: section.getBoundingClientRect().top + window.pageYOffset,
//       behavior: "smooth",
//     });
//     if (window.innerWidth <= 1200) {
//       toggleMenu();
//     }
//   })
// );
// document.addEventListener("click", (e) => {
//   if (
//     e.target !== burger &&
//     e.target !== menu &&
//     e.target.closest(".menu") !== menu &&
//     burger.classList.contains("active")
//   ) {
//     toggleMenu();
//   }
// });

// // Mask
// // Inputmask({"mask": "(999) 999-9999", ... other_options, ...}).mask(selector);
// // Ajax
// const ajaxSend = async (formData) => {
//   const fetchResp = await fetch("mail.php", {
//     method: "POST",
//     body: formData,
//   });
//   if (!fetchResp.ok) {
//     throw new Error(
//       `Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`
//     );
//   }
//   return await fetchResp.text();
// };
// const forms = document.querySelectorAll("form");
// forms.forEach((form) => {
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     ajaxSend(formData)
//       .then((response) => {
//         form.reset(); // очищаем поля формы
//       })
//       .catch((err) => console.error(err));
//   });
// });

// Header search
const searchBtn = document.querySelector(".header-top__search-btn");
const closeBtn = document.querySelector(".header-top__menu-close");
const searchForm = document.querySelector(".header-top__search");
const deliveryText = document.querySelector(".header-top__delivery");
const phoneText = document.querySelector(".header-top__phone");

searchBtn.addEventListener("click", (e) => {
  deliveryText.classList.add("hide");
  phoneText.classList.add("hide");
  searchForm.classList.add("active");

  searchBtn.style.display = "none";
  closeBtn.style.display = "inline-block";
  setTimeout(() => {
    searchForm.style.transitionDelay = "0s";
  }, 600);
});

closeBtn.addEventListener("click", (e) => {
  deliveryText.classList.remove("hide");
  phoneText.classList.remove("hide");
  searchForm.classList.remove("active");

  closeBtn.style.display = "none";
  searchBtn.style.display = "inline-block";
  setTimeout(() => {
    searchForm.style.transitionDelay = "0.6s";
  }, 400);
});
