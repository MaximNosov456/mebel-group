export const accordion = () => {
  const accordionTitles = document.querySelectorAll(".accordion__title");

  const closeItems = (item) => {
    item.classList.remove("active-title");
    item.nextElementSibling.classList.remove("active-content");
    item.nextElementSibling.style.maxHeight = 0 + "px";
  };

  accordionTitles.forEach((title) =>
    title.addEventListener("click", function () {
      if (this.classList.contains("active-title")) {
        closeItems(this);
      } else {
        accordionTitles.forEach((title) => closeItems(title));
        this.classList.add("active-title");
        this.nextElementSibling.classList.add("active-content");
        this.nextElementSibling.style.maxHeight =
          this.nextElementSibling.scrollHeight + 40 + "px";
      }
    })
  );
};
