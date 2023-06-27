window.addEventListener("DOMContentLoaded", adjustContactSectionHeight);

function adjustContactSectionHeight() {
  const vh = document.querySelector(".vh");
  const contentHeight = vh.scrollHeight;
  const viewportHeight = window.innerHeight;

  if (contentHeight > viewportHeight) {
    contactSection.style.height = "auto";
  } else {
    contactSection.style.height = "100vh";
  }
}
adjustContactSectionHeight();
