$(function () {
  $("#nav-placeholder").load("nav.html", function () {
    let myDiv = document.querySelector(".burger");
    let x = document.getElementById("myLinks");
    let box = document.querySelector(".box");
    function handleBurgerClick() {
      if (x.style.display === "block") {
        x.style.display = "none";
        box.style.display = "block";
      } else {
        x.style.display = "block";
        box.style.display = "none";
      }
    }

    myDiv.addEventListener("click", handleBurgerClick);

    function handleMediaQueryChange(mq) {
      if (!mq.matches && x.style.display === "block") {
        x.style.display = "none";
      }
    }

    var mediaQuery = window.matchMedia("(max-width: 720px)");
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);
  });
});
