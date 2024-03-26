const navToggleIcon = document.querySelector(".nav__toggle-icon");

navToggleIcon.addEventListener("click", function () {
  this.classList.toggle("nav__toggle-icon--open");
});
