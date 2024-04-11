const navToggleIcon = document.querySelector(".nav__toggle-icon");
const menu = document.querySelector(".menu");
const cover = document.querySelector(".cover");
const resumeListItems = document.querySelectorAll(".resume-list__item");
const portfolioListItems = document.querySelectorAll(".portfolio-list__item");
const menuItems = document.querySelectorAll(".menu__item");
const sections = document.querySelectorAll("main > section");

navToggleIcon.addEventListener("click", function () {
  this.classList.toggle("nav__toggle-icon--open");
  menu.classList.toggle("menu--open");
  cover.classList.toggle("cover--show");
});

function navigationTabsInit(
  listItems,
  listItemActiveClass,
  contentItemShowClass
) {
  listItems.forEach((listItem) => {
    listItem.addEventListener("click", function () {
      removeActiveClass(listItemActiveClass);
      removeActiveClass(contentItemShowClass);

      this.classList.add(listItemActiveClass);

      let contentId = this.getAttribute("data-content-id");
      document.querySelector(contentId).classList.add(contentItemShowClass);
    });
  });
}

function removeActiveClass(classNameActive) {
  document
    .querySelector(`.${classNameActive}`)
    .classList.remove(classNameActive);
}

navigationTabsInit(
  resumeListItems,
  "resume-list__item--active",
  "resume-content--show"
);

navigationTabsInit(
  portfolioListItems,
  "portfolio-list__item--active",
  "portfolio-content--active"
);

const observer = new IntersectionObserver(observerHandler, {
  threshold: 0.36,
});

function observerHandler(allsections) {
  allsections.map((section) => {
    let sectionClassName = section.target.className;
    let sectionMenuItem = document.querySelector(
      `.menu__item[data-section=${sectionClassName}]`
    );
    if (section.isIntersecting) {
      sectionMenuItem.classList.add("menu__item--active");
    } else {
      sectionMenuItem.classList.remove("menu__item--active");
    }
  });
}

sections.forEach((section) => {
  observer.observe(section);
});

menuItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    removeActiveClass("menu__item--active");
    item.classList.add("menu__item--active");

    let sectionClass = item.getAttribute("data-section");
    let sectionOffsetTop = document.querySelector(`.${sectionClass}`).offsetTop;

    window.scrollTo({
      top: sectionOffsetTop - 120,
      behavior: "smooth",
    });
  });
});
