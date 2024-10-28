let div3_7 = document.querySelector(".v3_7");
let divprofile_card = document.querySelector(".profile-card");
divprofile_card.setAttribute("style", `left: ${window.innerWidth - 360}px`);
window.addEventListener("resize", function () {
  divprofile_card.setAttribute("style", `left: ${window.innerWidth - 360}px`);
});
let isHovering1 = false;
let isHovering2 = false;
div3_7.addEventListener("mouseover", () => {
  isHovering1 = true;
  divprofile_card.style.display = "block";
});

divprofile_card.addEventListener("mouseover", () => {
  isHovering2 = true;
  divprofile_card.style.display = "block";
});

div3_7.addEventListener("mouseout", () => {
  isHovering1 = false;
  checkAndHide();
});

divprofile_card.addEventListener("mouseout", () => {
  isHovering2 = false;
  checkAndHide();
});

function checkAndHide() {
  if (!isHovering1 && !isHovering2) {
    divprofile_card.style.display = "none";
  }
}
