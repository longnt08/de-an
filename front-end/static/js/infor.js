let notificationCard = document.querySelector(".notification-card");
let profile_card = document.querySelector(".profile-card");
profile_card.setAttribute("style", `left: ${window.innerWidth - 360}px`);
window.addEventListener("resize", function () {
  profile_card.setAttribute("style", `left: ${window.innerWidth - 360}px`);
});
let isHovering1 = false;
let isHovering2 = false;
notificationCard.addEventListener("mouseover", () => {
  isHovering1 = true;
  profile_card.style.display = "block";
});

profile_card.addEventListener("mouseover", () => {
  isHovering2 = true;
  profile_card.style.display = "block";
});

notificationCard.addEventListener("mouseout", () => {
  isHovering1 = false;
  checkAndHide();
});

profile_card.addEventListener("mouseout", () => {
  isHovering2 = false;
  checkAndHide();
});

function checkAndHide() {
  if (!isHovering1 && !isHovering2) {
    profile_card.style.display = "none";
  }
}
