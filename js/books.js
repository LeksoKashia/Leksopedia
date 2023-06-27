const apiKey = "AIzaSyCfCKshWZlBTI9C-EYMTlCg8-apQICiQ1A"; // Replace with your actual API key
const SEARCH_API_Titles = `https://www.googleapis.com/books/v1/volumes?q=`;
const SEARCH_API_Authors = `https://www.googleapis.com/books/v1/volumes?q=inauthor:`;

const search = document.getElementById("search-box");
const form = document.querySelector("#form");
const output = document.querySelector("#output");
const select = document.querySelector("#select");

async function getBooks(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.items);
    console.log(data.items.length);
    showBooks(data.items);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function showBooks(res) {
  output.innerHTML = " ";
  for (let i = 0; i < res.length; i++) {
    let { title, authors, pageCount, averageRating } = res[i].volumeInfo;
    let image = "";
    if (res[i].volumeInfo.hasOwnProperty("imageLinks")) {
      image = res[i].volumeInfo.imageLinks.thumbnail;
    } else {
      image =
        "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";
    }
    console.log(authors);
    let author;
    if (authors.length >= 2) {
      author = authors[0] + "," + authors[1];
    } else {
      author = authors[0];
    }
    let style = "style='font-size:1.1rem'";
    if (title.length > 55) {
      style = "style='font-size:0.9rem'";
    }
    let pages;
    if (!pageCount) {
      pages = "unk.";
    } else {
      pages = pageCount;
    }
    if (!averageRating) {
      averageRating = "unk.";
    }

    output.innerHTML += `
      <div class="book" style="opacity: 0; animation: fadeIn 0.1s ease forwards ${
        i * 0.1
      }s">
        <div class="image">
          <img src="${image}" alt="" />
          <a href="" class="eye"><i class="fa-solid fa-eye"></i></a>
        </div>
        <div class="text">
          <div class="info1">
            <p class="title" ${style}>${title}</p>
            <p >${authors}</p>
          </div>
          <div class="info2">
            <span class="pages"><i class="fa-solid fa-book-open" style="color: #53d3b1"></i> ${pages}</span>
            <span class="rate"><i class="fa-solid fa-star" style="color: #f2ff00"></i> ${averageRating}</span>
          </div>
        </div>
      </div>
    `;
  }

  const books = document.querySelectorAll(".book");
  books.forEach((book) => {
    book.style.opacity = 1;
  });
}
select.addEventListener("change", function () {
  const selectedValue = select.value;
  search.classList.add("phStyle");
  search.classList.remove("show-placeholder"); // Remove the class initially

  search.classList.add("phStyle");
  if (selectedValue === "Title") {
    search.placeholder = "Enter Book Title ";
  } else if (selectedValue === "Author") {
    search.placeholder = "Enter Book Author ";
  }
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  const selectTerm = select.value;
  if (searchTerm && searchTerm !== "") {
    if (selectTerm == "Title") {
      getBooks(SEARCH_API_Titles + searchTerm);
      search.value = "";
    } else {
      getBooks(SEARCH_API_Authors + searchTerm);
      search.value = "";
    }
  } else {
    window.location.reload;
  }
});
